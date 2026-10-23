package com.remind.community;

import static org.junit.jupiter.api.Assertions.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.regex.Pattern;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("community-test")
class CommunityIntegrationTest {
    @Value("${local.server.port}") int port;
    record Reply(int status, String body) {}

    Reply call(String method, String path, String token, Object body) {
        var request = RestClient.create("http://127.0.0.1:" + port).method(HttpMethod.valueOf(method))
                .uri("/api/community" + path).contentType(MediaType.APPLICATION_JSON);
        if (token != null) request.header("Authorization", "Bearer " + token);
        if (body != null) request.body(body);
        return request.exchange((req, response) -> new Reply(response.getStatusCode().value(),
                new String(response.getBody().readAllBytes(), StandardCharsets.UTF_8)));
    }
    String session() {
        Reply reply = call("POST", "/session", null, null);
        assertEquals(201, reply.status);
        var matcher = Pattern.compile("\"token\":\"([a-f0-9]{64})\"").matcher(reply.body);
        assertTrue(matcher.find());
        return matcher.group(1);
    }
    long number(Reply reply, String key) {
        var matcher = Pattern.compile("\"" + key + "\":(\\d+)").matcher(reply.body);
        assertTrue(matcher.find(), reply.body);
        return Long.parseLong(matcher.group(1));
    }
    long post(String token, String mode, String title) {
        Reply reply = call("POST", "/posts", token, Map.of("mode", mode, "title", title, "content", "함께 돌보는 이야기입니다."));
        assertEquals(201, reply.status, reply.body);
        return number(reply, "id");
    }
    String unique() { return UUID.randomUUID().toString(); }

    @Test void postsAndCommentsEnforceOwnershipAndDeleteDependents() {
        String owner = session(), visitor = session();
        long id = post(owner, "SOLUTION", "함께하는 돌봄 " + unique());
        String path = "/posts/" + id;
        Reply publicView = call("GET", path, null, null);
        assertEquals(200, publicView.status);
        assertFalse(publicView.body.contains("\"nickname\":null"));
        assertFalse(publicView.body.contains(owner));
        assertFalse(publicView.body.contains("tokenHash"));
        assertTrue(publicView.body.contains("\"mine\":false"));
        assertEquals(401, call("PUT", path, null, Map.of("title", "수정", "content", "내용")).status);
        assertEquals(403, call("PUT", path, visitor, Map.of("title", "수정", "content", "내용")).status);
        assertEquals(403, call("DELETE", path, visitor, null).status);
        Reply edited = call("PUT", path, owner, Map.of("title", "바뀐 제목", "content", "바뀐 내용"));
        assertEquals(200, edited.status);
        assertTrue(edited.body.contains("바뀐 제목"));
        Reply comment = call("POST", path + "/comments", visitor, Map.of("content", "응원합니다."));
        assertEquals(201, comment.status, comment.body);
        long commentId = number(comment, "id");
        assertEquals(403, call("DELETE", path + "/comments/" + commentId, owner, null).status);
        assertEquals(1, number(call("GET", path, owner, null), "commentCount"));
        assertEquals(204, call("DELETE", path + "/comments/" + commentId, visitor, null).status);
        assertEquals(0, number(call("GET", path, owner, null), "commentCount"));
        assertEquals(201, call("POST", path + "/comments", visitor, Map.of("content", "다시 응원합니다.")).status);
        call("PUT", path + "/like", visitor, null);
        assertEquals(204, call("DELETE", path, owner, null).status);
        assertEquals(404, call("GET", path, null, null).status);
        assertEquals(404, call("GET", path + "/comments", visitor, null).status);
    }

    @Test void empathyPostsAcceptCommentsWithTheSameOwnershipRules() {
        String token = session(), visitor = session();
        long id = post(token, "EMPATHY", "마음을 나눠요 " + unique());
        Reply reply = call("POST", "/posts/" + id + "/comments", visitor, Map.of("content", "그 마음 이해해요."));
        assertEquals(201, reply.status, reply.body);
        assertEquals(1, number(call("GET", "/posts/" + id, token, null), "commentCount"));
        assertEquals(1, number(call("GET", "/posts/" + id + "/comments", token, null), "totalElements"));
        long commentId = number(reply, "id");
        assertEquals(403, call("DELETE", "/posts/" + id + "/comments/" + commentId, token, null).status);
        assertEquals(204, call("DELETE", "/posts/" + id + "/comments/" + commentId, visitor, null).status);
        assertEquals(0, number(call("GET", "/posts/" + id, token, null), "commentCount"));
        assertEquals(1, number(call("PUT", "/posts/" + id + "/like", token, null), "likeCount"));
    }

    @Test void likesAndViewsAreIdempotentIncludingConcurrentRequests() {
        String owner = session(), visitor = session();
        long id = post(owner, "SOLUTION", "중복 공감 확인 " + unique());
        String path = "/posts/" + id;
        var jobs = new ArrayList<CompletableFuture<Reply>>();
        for (int i = 0; i < 8; i++) jobs.add(CompletableFuture.supplyAsync(() -> call("PUT", path + "/like", visitor, null)));
        jobs.forEach(job -> assertEquals(200, job.join().status));
        assertEquals(1, number(call("GET", path, visitor, null), "likeCount"));
        assertEquals(1, number(call("PUT", path + "/view", visitor, null), "viewCount"));
        assertEquals(1, number(call("PUT", path + "/view", visitor, null), "viewCount"));
        assertEquals(2, number(call("PUT", path + "/view", owner, null), "viewCount"));
        assertEquals(2, number(call("PUT", path + "/like", owner, null), "likeCount"));
        assertEquals(1, number(call("DELETE", path + "/like", visitor, null), "likeCount"));
        assertEquals(1, number(call("DELETE", path + "/like", visitor, null), "likeCount"));
    }

    @Test void searchFiltersPaginationAndPopularityUseStoredData() {
        String owner = session(), visitor = session(), term = unique();
        long first = post(owner, "SOLUTION", term + " 첫 글");
        long second = post(owner, "EMPATHY", term + " 둘째 글");
        post(visitor, "SOLUTION", term + " 셋째 글");
        call("PUT", "/posts/" + first + "/like", visitor, null);
        Reply list = call("GET", "/posts?q=" + term + "&size=1&sort=POPULAR", owner, null);
        assertEquals(200, list.status, list.body);
        assertEquals(first, number(list, "id"));
        assertEquals(3, number(list, "totalElements"));
        assertTrue(list.body.contains("\"hasNext\":true"));
        call("POST", "/posts/" + second + "/comments", visitor, Map.of("content", "함께 이야기해요."));
        Reply recommended = call("GET", "/posts?q=" + term + "&sort=RECOMMENDED", owner, null);
        assertEquals(200, recommended.status, recommended.body);
        assertEquals(second, number(recommended, "id"));
        assertEquals(2, number(call("GET", "/posts?q=" + term + "&mode=SOLUTION", owner, null), "totalElements"));
        assertEquals(2, number(call("GET", "/posts?q=" + term + "&mine=true", owner, null), "totalElements"));
        assertEquals(401, call("GET", "/posts?mine=true", null, null).status);
        Reply literal = call("GET", "/posts?q=%25", owner, null);
        assertEquals(0, number(literal, "totalElements"));
    }

    @Test void invalidInputsAndUnknownPostsReturnUsefulErrors() {
        String token = session();
        assertEquals(400, call("POST", "/posts", token, Map.of("mode", "SOLUTION", "title", "   ", "content", "내용")).status);
        assertEquals(400, call("POST", "/posts", token, Map.of("mode", "SOLUTION", "title", "a".repeat(121), "content", "내용")).status);
        assertEquals(400, call("POST", "/posts", token, Map.of("mode", "OTHER", "title", "제목", "content", "내용")).status);
        assertEquals(400, call("POST", "/posts", token, "{broken").status);
        assertEquals(400, call("GET", "/posts?page=-1", token, null).status);
        assertEquals(400, call("GET", "/posts?size=500", token, null).status);
        assertEquals(400, call("GET", "/posts?mode=OTHER", token, null).status);
        assertEquals(404, call("GET", "/posts/9999999", token, null).status);
        assertEquals(401, call("GET", "/session", "a".repeat(64), null).status);
    }
}
