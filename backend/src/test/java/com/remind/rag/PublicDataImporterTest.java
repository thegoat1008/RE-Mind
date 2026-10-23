package com.remind.rag;

import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.nio.charset.StandardCharsets;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import tools.jackson.databind.json.JsonMapper;
import static org.assertj.core.api.Assertions.*;

/** Imports exercise a real isolated H2 transaction and snapshot refresh with fake provider HTTP. */
class PublicDataImporterTest {
    HttpServer server;
    RagDocumentRepository repository;
    DatabaseKnowledgeSearch search;
    PublicDataImporter importer;
    boolean failSecondDetail;

    @BeforeEach void start() throws Exception {
        DriverManagerDataSource dataSource = new DriverManagerDataSource("jdbc:h2:mem:import-" + UUID.randomUUID() + ";DB_CLOSE_DELAY=-1", "sa", "");
        repository = new RagDocumentRepository(dataSource);
        repository.initializeSchema();
        repository.upsertAll(List.of(RagDocument.create("WELFARE", "W1", "POLICY", "치매 기존 지원",
            "치매 기존 지원 자료입니다. 이 자료는 실패한 새 수집 때문에 삭제되면 안 됩니다.",
            "https://www.data.go.kr/data/15090532/openapi.do", "2025", Instant.parse("2026-01-01T00:00:00Z"))));
        search = new DatabaseKnowledgeSearch(repository, Clock.systemUTC());
        server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/", exchange -> {
            String response;
            if (exchange.getRequestURI().getPath().endsWith("NationalWelfarelistV001")) {
                response = "<response><wantedList><resultCode>0</resultCode><totalCount>2</totalCount>"
                    + "<servList><servId>W1</servId></servList><servList><servId>W2</servId></servList></wantedList></response>";
            } else if (exchange.getRequestURI().getRawQuery().contains("servId=W2") && failSecondDetail) {
                response = "<response><wantedDtl><resultCode>22</resultCode></wantedDtl></response>";
            } else {
                String id = exchange.getRequestURI().getRawQuery().contains("servId=W2") ? "W2" : "W1";
                response = "<response><wantedDtl><resultCode>0</resultCode><servId>" + id + "</servId>"
                    + "<servNm>치매 새 지원 " + id + "</servNm><tgtrDtlCn>치매 가족의 조건을 기관에 확인합니다.</tgtrDtlCn>"
                    + "<slctCritCn>소득과 돌봄 상황에 따른 조건이 있습니다.</slctCritCn><crtrYr>2026</crtrYr></wantedDtl></response>";
            }
            byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, bytes.length);
            exchange.getResponseBody().write(bytes); exchange.close();
        });
        server.start();
        URI base = URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/");
        PublicDataClient client = new PublicDataClient(HttpClient.newHttpClient(), JsonMapper.builder().build(),
            "synthetic-only-key", Duration.ofSeconds(2), base, base, base);
        importer = new PublicDataImporter(client, repository, search);
    }
    @AfterEach void stop() { server.stop(0); }

    @Test void anyDetailFailurePreservesExistingDatabaseAndSnapshot() {
        assertThat(search.search("치매 지원")).anyMatch(k -> k.title().contains("기존"));
        failSecondDetail = true;
        assertThatThrownBy(() -> importer.importSource("welfare", "치매", "", 1, 2)).isInstanceOf(Problem.class);
        assertThat(repository.findActive("POLICY", 100)).singleElement().satisfies(d -> {
            assertThat(d.title()).isEqualTo("치매 기존 지원");
            assertThat(d.sourceUpdatedAt()).isEqualTo("2025");
        });
        assertThat(search.search("치매 지원")).anyMatch(k -> k.title().contains("기존"));
    }

    @Test void successfulImportUpdatesIdempotentlyAndInvalidatesSearchSnapshot() {
        assertThat(search.search("치매 지원")).anyMatch(k -> k.title().contains("기존"));
        PublicDataImporter.ImportResult result = importer.importSource("welfare", "치매", "", 1, 1);
        assertThat(result.fetched()).isEqualTo(1);
        assertThat(result.stored()).isEqualTo(1);
        assertThat(result.status()).isEqualTo("IMPORTED");
        assertThat(repository.findActive("POLICY", 100)).singleElement().satisfies(d -> assertThat(d.title()).contains("새 지원"));
        assertThat(search.search("치매 지원")).anyMatch(k -> k.title().contains("새 지원"));
        importer.importSource("welfare", "치매", "", 1, 1);
        assertThat(repository.findActive("POLICY", 100)).hasSize(1);
    }

    @Test void arbitrarySourceIsRejectedWithoutChangingDatabase() {
        assertThatThrownBy(() -> importer.importSource("https://attacker.invalid", "", "", 1, 1))
            .isInstanceOf(IllegalArgumentException.class);
        assertThat(repository.findActive("POLICY", 100)).singleElement().satisfies(d -> assertThat(d.title()).contains("기존"));
    }
}
