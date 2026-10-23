package com.remind.rag;

import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;
import static org.assertj.core.api.Assertions.*;

/** Contract tests against a local fake HTTP server, never a live Gemini account. */
class GeminiChatbotGatewayTest {
    final JsonMapper json = JsonMapper.builder().build();
    HttpServer server;
    GeminiChatbotGateway gateway;
    int status = 200;
    String response;
    final AtomicReference<String> sent = new AtomicReference<>();
    final AtomicReference<String> keyHeader = new AtomicReference<>();
    final AtomicReference<String> requestedUri = new AtomicReference<>();
    final AtomicInteger calls = new AtomicInteger();

    @BeforeEach void setup() throws Exception {
        server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/models/test:generateContent", exchange -> {
            calls.incrementAndGet();
            requestedUri.set(exchange.getRequestURI().toString());
            sent.set(new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8));
            keyHeader.set(exchange.getRequestHeaders().getFirst("x-goog-api-key"));
            byte[] data = response.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(status, data.length);
            exchange.getResponseBody().write(data);
            exchange.close();
        });
        server.start();
        gateway = new GeminiChatbotGateway(HttpClient.newHttpClient(), json,
            URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/"),
            "fake-test-key", "test", Duration.ofSeconds(2));
        response = envelope("{\"reply\":\"많이 지치셨겠어요. 이야기해 주셔서 고마워요.\",\"evidence\":[]}", "STOP");
    }
    @AfterEach void stop() { server.stop(0); }

    ChatbotDtos.Context context() {
        return new ChatbotDtos.Context("그 이야기 조금 더 들어줘", List.of(
            new ChatbotDtos.Turn("user", "오늘 돌봄이 힘들었어"),
            new ChatbotDtos.Turn("assistant", "많이 지치셨겠어요.")),
            List.of(new Models.Knowledge("policy-1#0", "가족 지원", "POLICY",
                "지원 대상과 신청 조건은 담당 기관의 최신 안내를 통해 확인해야 합니다.",
                "https://example.org/official", "2026-10-24", List.of("가족"))),
            "2026-10-24", "Asia/Seoul");
    }
    String envelope(String text, String finish) {
        return json.writeValueAsString(Map.of("candidates", List.of(Map.of("finishReason", finish,
            "content", Map.of("parts", List.of(Map.of("text", text)))))));
    }

    @Test void sendsHistoryAsRolesAndCurrentPublicKnowledgeWithHeaderOnlyKey() {
        assertThat(gateway.configured()).isTrue();
        assertThat(gateway.liveVerified()).isFalse();
        assertThat(gateway.lastVerifiedAt()).isNull();
        ChatbotDtos.Answer answer = gateway.generate(context());
        assertThat(answer.reply()).contains("지치셨");
        JsonNode payload = json.readTree(sent.get());
        JsonNode contents = payload.path("contents");
        assertThat(contents.size()).isEqualTo(3);
        assertThat(contents.path(0).path("role").asString()).isEqualTo("user");
        assertThat(contents.path(1).path("role").asString()).isEqualTo("model");
        assertThat(contents.path(2).path("role").asString()).isEqualTo("user");
        JsonNode prior = json.readTree(contents.path(0).path("parts").path(0).path("text").asString());
        assertThat(prior.path("untrustedConversationText").asString()).isEqualTo("오늘 돌봄이 힘들었어");
        JsonNode current = json.readTree(contents.path(2).path("parts").path(0).path("text").asString());
        assertThat(current.path("message").asString()).isEqualTo("그 이야기 조금 더 들어줘");
        assertThat(current.path("knowledge").path(0).path("id").asString()).isEqualTo("policy-1#0");
        assertThat(payload.path("generationConfig").path("responseFormat").path("text")
            .path("mimeType").asString()).isEqualTo("APPLICATION_JSON");
        assertThat(sent.get()).doesNotContain("fake-test-key", "sourceIds", "actions");
        assertThat(keyHeader.get()).isEqualTo("fake-test-key");
        assertThat(requestedUri.get()).isEqualTo("/models/test:generateContent");
        assertThat(gateway.provider()).isEqualTo("gemini");
        assertThat(gateway.model()).isEqualTo("test");
        assertThat(gateway.liveVerified()).isTrue();
        assertThat(Instant.parse(gateway.lastVerifiedAt())).isBeforeOrEqualTo(Instant.now());
    }

    @Test void returnsEvidenceForServiceToCheckAgainstRetrievedText() {
        String quote = "지원 대상과 신청 조건은 담당 기관의 최신 안내를 통해 확인해야 합니다.";
        response = envelope(json.writeValueAsString(Map.of("reply", "자료에서 확인한 내용을 안내할게요.",
            "evidence", List.of(Map.of("chunkId", "policy-1#0", "quote", quote)))), "STOP");
        assertThat(gateway.generate(context()).evidence()).containsExactly(new Models.Evidence("policy-1#0", quote));
    }

    @Test void thoughtPartsNeverAppearInTheAnswer() {
        response = json.writeValueAsString(Map.of("candidates", List.of(Map.of("finishReason", "STOP", "content",
            Map.of("parts", List.of(Map.of("thought", true, "text", "private reasoning"),
                Map.of("text", "{\"reply\":\"듣고 있어요.\",\"evidence\":[]}")))))));
        assertThat(gateway.generate(context()).reply()).isEqualTo("듣고 있어요.");
    }

    @Test void missingKeyNeverCallsNetworkOrPretendsToBeConnected() {
        GeminiChatbotGateway missing = new GeminiChatbotGateway(HttpClient.newHttpClient(), json,
            URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/"),
            " ", "test", Duration.ofSeconds(1));
        assertThatThrownBy(() -> missing.generate(context())).isInstanceOfSatisfying(Problem.class, p -> {
            assertThat(p.code()).isEqualTo("GEMINI_NOT_CONFIGURED");
            assertThat(p.status()).isEqualTo(503);
            assertThat(p.retryable()).isFalse();
        });
        assertThat(calls.get()).isZero();
        assertThat(missing.configured()).isFalse();
        assertThat(missing.liveVerified()).isFalse();
    }

    @Test void quotaAndAccessErrorsAreSanitizedAndNotVerified() {
        status = 429;
        response = "private upstream error with fake-test-key";
        assertProblem("GEMINI_LIMIT", true);
        status = 401;
        assertProblem("GEMINI_CONFIGURATION", false);
        status = 403;
        assertProblem("GEMINI_CONFIGURATION", false);
        assertThat(gateway.liveVerified()).isFalse();
    }

    @Test void modelAndUpstreamFailuresUseActionableCodesWithoutLeakingBody() {
        response = "private upstream error with fake-test-key";
        status = 404;
        assertProblem("GEMINI_MODEL_CONFIGURATION", false);
        status = 400;
        assertProblem("GEMINI_MODEL_CONFIGURATION", false);
        status = 503;
        assertProblem("GEMINI_UNAVAILABLE", true);
    }

    @Test void incompleteOrBlockedResponsesAreNeverVerified() {
        response = envelope("{\"reply\":\"done\",\"evidence\":[]}", "MAX_TOKENS");
        assertProblem("GEMINI_INVALID_RESPONSE", true);
        response = "{\"promptFeedback\":{\"blockReason\":\"SAFETY\"}}";
        assertProblem("GEMINI_INVALID_RESPONSE", true);
        assertThat(gateway.liveVerified()).isFalse();
        assertThat(gateway.lastVerifiedAt()).isNull();
    }

    @Test void malformedMissingOrUnexpectedFieldsAreRejected() {
        for (String malformed : List.of("not JSON", "{\"reply\":\"ok\"}",
            "{\"reply\":\"ok\",\"evidence\":null}",
            "{\"reply\":\"ok\",\"evidence\":[],\"actions\":[]}",
            "{\"reply\":\"  \",\"evidence\":[]}")) {
            response = envelope(malformed, "STOP");
            assertProblem("GEMINI_INVALID_RESPONSE", true);
        }
        assertThat(gateway.liveVerified()).isFalse();
    }

    @Test void invalidAndRepeatedEvidenceIsRejectedBeforeFactChecking() {
        response = envelope("{\"reply\":\"ok\",\"evidence\":[{\"chunkId\":\"policy-1#0\",\"quote\":\"too short\"}]}", "STOP");
        assertProblem("GEMINI_INVALID_RESPONSE", true);
        Map<String, String> item = Map.of("chunkId", "policy-1#0", "quote", "지원 대상과 신청 조건은 담당 기관의 최신 안내를 통해 확인해야 합니다.");
        response = envelope(json.writeValueAsString(Map.of("reply", "ok", "evidence", List.of(item, item))), "STOP");
        assertProblem("GEMINI_INVALID_RESPONSE", true);
    }

    @Test void largeEnvelopeAndOversizedReplyAreRejected() {
        response = " ".repeat(100_001);
        assertProblem("GEMINI_INVALID_RESPONSE", true);
        response = envelope(json.writeValueAsString(Map.of("reply", "x".repeat(1201), "evidence", List.of())), "STOP");
        assertProblem("GEMINI_INVALID_RESPONSE", true);
    }

    @Test void connectionFailureIsSanitizedAndNeverVerified() {
        int closedPort = server.getAddress().getPort();
        server.stop(0);
        GeminiChatbotGateway disconnected = new GeminiChatbotGateway(HttpClient.newHttpClient(), json,
            URI.create("http://127.0.0.1:" + closedPort + "/"), "fake-test-key", "test", Duration.ofMillis(300));
        assertThatThrownBy(() -> disconnected.generate(context())).isInstanceOfSatisfying(Problem.class,
            p -> assertThat(p.code()).isEqualTo("GEMINI_UNAVAILABLE"));
        assertThat(disconnected.liveVerified()).isFalse();
    }

    private void assertProblem(String code, boolean retryable) {
        assertThatThrownBy(() -> gateway.generate(context())).isInstanceOfSatisfying(Problem.class, p -> {
            assertThat(p.code()).isEqualTo(code);
            assertThat(p.retryable()).isEqualTo(retryable);
            assertThat(p.getMessage()).doesNotContain("private", "fake-test-key", "upstream");
        });
    }
}
