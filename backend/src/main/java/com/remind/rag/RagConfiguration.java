package com.remind.rag;

import java.net.URI;
import java.net.http.HttpClient;
import java.time.Clock;
import java.time.Duration;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Set;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import tools.jackson.databind.json.JsonMapper;

/** Adds AI beans to the existing application; never creates a second DataSource. */
@Configuration
@Profile("rag")
public class RagConfiguration {
    public RagConfiguration(Environment environment) {
        Set<String> dbProfiles=Set.of("dev","prod","community-local","community-mysql","oni","rag-local","rag-mysql","rag-test");
        if(Arrays.stream(environment.getActiveProfiles()).noneMatch(dbProfiles::contains))
            throw new IllegalStateException("RAG는 기존 DB 프로필과 함께 실행하세요: dev,rag / community-mysql,rag / rag,rag-mysql / rag,rag-local");
    }
    @Bean Clock ragClock() { return Clock.system(ZoneId.of("Asia/Seoul")); }
    @Bean RagDocumentRepository ragDocumentRepository(DataSource dataSource,
            @Value("${rag.schema.initialize:false}") boolean initialize) {
        RagDocumentRepository repository=new RagDocumentRepository(dataSource);
        if(initialize) repository.initializeSchema();
        repository.counts(); // Fail clearly if the explicit schema migration has not been applied.
        return repository;
    }
    @Bean DatabaseKnowledgeSearch ragKnowledgeSearch(RagDocumentRepository repository,@Qualifier("ragClock") Clock clock) {
        return new DatabaseKnowledgeSearch(repository,clock);
    }
    @Bean ChatbotGateway ragChatbotGateway(@Value("${rag.gemini.api-key:}") String key,
            @Value("${rag.gemini.model:gemini-3.5-flash-lite}") String model) {
        return new GeminiChatbotGateway(HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5)).build(),
            JsonMapper.builder().build(),URI.create("https://generativelanguage.googleapis.com/v1beta/"),key,model,Duration.ofSeconds(25));
    }
    @Bean ChatbotService ragChatbotService(ChatbotGateway gateway,DatabaseKnowledgeSearch search,
            @Qualifier("ragClock") Clock clock) { return new ChatbotService(gateway,search,clock); }
    @Bean PublicDataClient ragPublicDataClient(@Value("${rag.public-data.service-key:}") String key) {
        return new PublicDataClient(HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5))
            .followRedirects(HttpClient.Redirect.NEVER).build(),JsonMapper.builder().build(),key,Duration.ofSeconds(20));
    }
    @Bean PublicDataImporter ragPublicDataImporter(PublicDataClient client,RagDocumentRepository repository,
            DatabaseKnowledgeSearch search) { return new PublicDataImporter(client,repository,search); }
    @Bean OriginPolicy ragOriginPolicy(@Value("${rag.allowed-origins:http://localhost:5173,http://127.0.0.1:5173}") String allowed) {
        return new OriginPolicy(allowed);
    }
    @Bean WebMvcConfigurer ragCors(OriginPolicy origins) {
        return new WebMvcConfigurer() {
            @Override public void addCorsMappings(CorsRegistry registry) {
                if(!origins.allowedOrigins().isEmpty()) registry.addMapping("/api/chatbot/**")
                    .allowedOrigins(origins.allowedOrigins().toArray(String[]::new))
                    .allowedMethods("GET","POST","DELETE","OPTIONS").allowCredentials(true).maxAge(600);
            }
        };
    }
}
