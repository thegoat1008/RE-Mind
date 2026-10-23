package com.remind.rag;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.sql.DataSource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import static org.junit.jupiter.api.Assertions.*;

class RagDocumentRepositoryTest {
    private static final Instant NOW = Instant.parse("2026-10-24T00:00:00Z");
    private DataSource dataSource;
    private RagDocumentRepository repository;

    @BeforeEach void setup() {
        dataSource = new DriverManagerDataSource("jdbc:h2:mem:rag-" + UUID.randomUUID() + ";MODE=MySQL;DB_CLOSE_DELAY=-1", "sa", "");
        repository = new RagDocumentRepository(dataSource);
    }

    @Test void constructorDoesNotImplicitlyCreateSchema() {
        Problem problem = assertThrows(Problem.class, () -> repository.findActive("POLICY", 10));
        assertEquals("RAG_DB_UNAVAILABLE", problem.code());
        repository.initializeSchema();
        assertTrue(repository.findActive("POLICY", 10).isEmpty());
    }

    @Test void initializationAndImportsDoNotTouchExistingCommunityTable() throws Exception {
        try (Connection connection = dataSource.getConnection(); Statement statement = connection.createStatement()) {
            statement.execute("CREATE TABLE community_posts(id BIGINT PRIMARY KEY,title VARCHAR(120))");
            statement.execute("INSERT INTO community_posts VALUES(73,'keep existing post')");
        }
        repository.initializeSchema();
        repository.initializeSchema();
        repository.upsertAll(List.of(document("1", "자료 내용")));
        try (Connection connection = dataSource.getConnection(); Statement statement = connection.createStatement();
             ResultSet rows = statement.executeQuery("SELECT title FROM community_posts WHERE id=73")) {
            assertTrue(rows.next());
            assertEquals("keep existing post", rows.getString(1));
        }
    }

    @Test void repeatedImportUpdatesSameDocumentAndPartialBatchNeverDeletesOthers() {
        repository.initializeSchema();
        repository.upsertAll(List.of(document("1", "원래 본문"), document("2", "다른 본문")));
        RagDocument changed = RagDocument.create("WELFARE", "1", "POLICY", "바뀐 제목", "바뀐 본문",
            "https://www.data.go.kr/data/15090532/openapi.do", "2026-10-24", NOW.plusSeconds(30));
        repository.upsertAll(List.of(changed, changed));
        assertEquals(2L, repository.counts().get("POLICY"));
        assertEquals(0L, repository.counts().get("HOSPITAL"));
        assertTrue(repository.findActive("POLICY", 1000).contains(changed));
        assertTrue(repository.findActive("POLICY", 1000).contains(document("2", "다른 본문")));
    }

    @Test void midBatchSqlFailureRollsBackEarlierUpdateAndInsert() throws Exception {
        repository.initializeSchema();
        RagDocument original = document("1", "원래 본문");
        repository.upsertAll(List.of(original));
        try (Connection connection = dataSource.getConnection(); Statement statement = connection.createStatement()) {
            statement.execute("ALTER TABLE ai_rag_documents ADD CONSTRAINT reject_title CHECK(title <> 'REJECT')");
        }
        RagDocument rejected = RagDocument.create("WELFARE", "3", "POLICY", "REJECT", "거부할 본문",
            "https://www.data.go.kr/data/1", "", NOW);
        Problem problem = assertThrows(Problem.class, () -> repository.upsertAll(List.of(
            document("1", "바뀌면 안 되는 본문"), document("2", "저장되면 안 되는 본문"), rejected)));
        assertEquals("RAG_DB_UNAVAILABLE", problem.code());
        assertEquals(List.of(original), repository.findActive("POLICY", 1000));
        assertFalse(problem.getMessage().contains("REJECT"));
        assertFalse(problem.getMessage().contains("jdbc:"));
    }

    @Test void perKindLimitRollsBackExcessBatchWithoutDeletingLastGoodData() {
        repository.initializeSchema();
        List<RagDocument> thousand = new ArrayList<>();
        for (int i = 0; i < 1000; i++) thousand.add(document("p-" + i, "내용 " + i));
        repository.upsertAll(thousand);
        Problem problem = assertThrows(Problem.class, () -> repository.upsertAll(List.of(document("extra", "초과 자료"))));
        assertEquals("RAG_DOCUMENT_LIMIT", problem.code());
        assertEquals(1000L, repository.counts().get("POLICY"));
        assertEquals(1000, repository.findActive("POLICY", 1000).size());
    }

    @Test void inactiveRowsAreNotSearchableAndKindsAreIsolated() throws Exception {
        repository.initializeSchema();
        repository.upsertAll(List.of(document("1", "정책"), RagDocument.create("HIRA", "hospital-1", "HOSPITAL",
            "병원", "서울 병원 위치", "https://www.data.go.kr/data/15001698/openapi.do", "", NOW)));
        assertEquals(1, repository.findActive("POLICY", 10).size());
        assertEquals(1, repository.findActive("HOSPITAL", 10).size());
        try (Connection connection = dataSource.getConnection(); Statement statement = connection.createStatement()) {
            statement.execute("UPDATE ai_rag_documents SET active=FALSE WHERE kind='POLICY'");
        }
        assertTrue(repository.findActive("POLICY", 10).isEmpty());
        assertEquals(0L, repository.counts().get("POLICY"));
        assertThrows(IllegalArgumentException.class, () -> repository.findActive("POLICY' OR 1=1 --", 10));
        assertThrows(IllegalArgumentException.class, () -> repository.findActive("POLICY", 1001));
    }

    @Test void schemaAlsoWorksWithH2WithoutMysqlCompatibilityMode() {
        RagDocumentRepository plain = new RagDocumentRepository(new DriverManagerDataSource(
            "jdbc:h2:mem:rag-plain-" + UUID.randomUUID() + ";DB_CLOSE_DELAY=-1", "sa", ""));
        plain.initializeSchema();
        plain.upsertAll(List.of(document("plain", "호환성 확인")));
        assertEquals(1L, plain.counts().get("POLICY"));
    }

    private static RagDocument document(String id, String content) {
        return RagDocument.create("WELFARE", id, "POLICY", "공식 정책", content,
            "https://www.data.go.kr/data/15090532/openapi.do", "2026", NOW);
    }
}
