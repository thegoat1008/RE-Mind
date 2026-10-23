package com.remind.ai;

import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import tools.jackson.databind.json.JsonMapper;
import static org.assertj.core.api.Assertions.*;

/** Contract tests use a local HTTP fake, never a paid model. */
class GeminiGatewayTest {
    HttpServer server; GeminiGateway gateway;
    int status=200; String response;
    AtomicReference<String> body=new AtomicReference<>();
    JsonMapper json=JsonMapper.builder().build();
    @BeforeEach void setup() throws Exception {
        server=HttpServer.create(new InetSocketAddress("127.0.0.1",0),0);
        server.createContext("/models/test:generateContent",exchange->{
            body.set(new String(exchange.getRequestBody().readAllBytes(),StandardCharsets.UTF_8));
            byte[] data=response.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().add("Content-Type","application/json");
            exchange.sendResponseHeaders(status,data.length);exchange.getResponseBody().write(data);exchange.close();
        }); server.start();
        gateway=new GeminiGateway(HttpClient.newHttpClient(),json,URI.create("http://127.0.0.1:"+server.getAddress().getPort()+"/"),"fake-key","test",Duration.ofSeconds(2));
    }
    @AfterEach void close(){server.stop(0);}
    String envelope(String content,String finish) {
        return json.writeValueAsString(java.util.Map.of("candidates",List.of(java.util.Map.of("finishReason",finish,
            "content",java.util.Map.of("parts",List.of(java.util.Map.of("text",content)))))));
    }
    AiGateway.Context context(List<PolicyCatalog.Policy> policies) {
        return new AiGateway.Context("공감해주세요","EMPATHY",List.of(),new DecisionEngine.Decision("EMPATHY","test",false),policies,null);
    }
    @Test void planUsesStructuredOutputAndDoesNotExposeKeyInBody(){
        response=envelope("{\"intent\":\"POLICY\",\"safety\":false,\"policyQuery\":\"방문요양\"}","STOP");
        assertThat(gateway.plan("도움 알려줘","SOLUTION",List.of()).intent()).isEqualTo("POLICY");
        assertThat(body.get()).contains("responseJsonSchema").doesNotContain("fake-key");
    }
    @Test void parsesVisibleAnswerAndIgnoresThoughtParts(){
        response=json.writeValueAsString(java.util.Map.of("candidates",List.of(java.util.Map.of("finishReason","STOP",
            "content",java.util.Map.of("parts",List.of(java.util.Map.of("thought",true,"text","internal"),
                java.util.Map.of("text","{\"text\":\"곁에서 들을게요.\",\"sourceIds\":[]}")))))));
        assertThat(gateway.answer(context(List.of())).text()).isEqualTo("곁에서 들을게요.");
    }
    @Test void rateLimitIsVisibleAndNeverDemoFallback(){
        status=429;response="upstream private body";
        assertThatThrownBy(()->gateway.plan("안녕","EMPATHY",List.of())).isInstanceOfSatisfying(AiProblem.class,e->{
            assertThat(e.code).isEqualTo("AI_RATE_LIMIT");assertThat(e.getMessage()).doesNotContain("private");
        });
    }
    @Test void missingKeyFailsBeforeNetwork(){
        GeminiGateway missing=new GeminiGateway(HttpClient.newHttpClient(),json,URI.create("http://127.0.0.1:1/"),"","test",Duration.ofSeconds(1));
        assertThatThrownBy(()->missing.plan("안녕","EMPATHY",List.of())).isInstanceOfSatisfying(AiProblem.class,e->assertThat(e.code).isEqualTo("AI_NOT_CONFIGURED"));
        assertThat(body.get()).isNull();
    }
    @Test void truncatedOutputIsNotSuccessful(){
        response=envelope("{\"intent\":\"POLICY\"}","MAX_TOKENS");
        assertThatThrownBy(()->gateway.plan("정책","SOLUTION",List.of())).isInstanceOf(AiProblem.class);
    }
    @Test void malformedJsonIsNotSuccessful(){
        response=envelope("not-json","STOP");
        assertThatThrownBy(()->gateway.plan("정책","SOLUTION",List.of())).isInstanceOf(AiProblem.class);
    }
    @Test void inventedCitationIsRejected(){
        response=envelope("{\"text\":\"지원금이 있어요\",\"sourceIds\":[\"invented\"]}","STOP");
        assertThatThrownBy(()->gateway.answer(context(List.of()))).isInstanceOf(AiProblem.class);
    }
    @Test void blockedOutputIsNotSuccessful(){
        response="{\"promptFeedback\":{\"blockReason\":\"SAFETY\"}}";
        assertThatThrownBy(()->gateway.answer(context(List.of()))).isInstanceOf(AiProblem.class);
    }
    @Test void inventedUrlIsRejected(){
        response=envelope("{\"text\":\"https://invented.example\",\"sourceIds\":[]}","STOP");
        assertThatThrownBy(()->gateway.answer(context(List.of()))).isInstanceOf(AiProblem.class);
    }
}
