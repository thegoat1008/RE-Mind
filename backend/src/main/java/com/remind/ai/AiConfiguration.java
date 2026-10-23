package com.remind.ai;

import java.net.URI;
import java.net.http.HttpClient;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tools.jackson.databind.json.JsonMapper;

@Configuration
public class AiConfiguration {
    @Bean AiGateway aiGateway(@Value("${oni.ai.provider:demo}") String provider,
                             @Value("${oni.ai.api-key:}") String key,
                             @Value("${oni.ai.model:gemini-3.1-flash-lite}") String model,
                             @Value("${oni.ai.timeout-seconds:25}") int timeout) {
        return switch(provider) {
            case "demo" -> new DemoGateway();
            case "gemini" -> new GeminiGateway(HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5)).build(),
                JsonMapper.builder().build(),URI.create("https://generativelanguage.googleapis.com/v1beta/"),key,model,
                Duration.ofSeconds(Math.min(60,Math.max(2,timeout))));
            default -> throw new IllegalStateException("ONI_AI_PROVIDER는 demo 또는 gemini여야 합니다.");
        };
    }
}
