package com.remind.rag;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import javax.sql.DataSource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.*;

/** Explicit bean registration keeps these checks independent from the legacy AI and application packages. */
class RagProfileIsolationTest {
    private final ApplicationContextRunner runner = new ApplicationContextRunner().withUserConfiguration(
        RagConfiguration.class, ChatbotController.class, RagKnowledgeController.class, ProblemAdvice.class,
        RagImportRunner.class);

    @Test void disabledRagProfileRegistersNoControllersAdviceConfigurationOrAiBeans() {
        runner.run(context -> {
            assertThat(context).hasNotFailed();
            assertThat(context).doesNotHaveBean(RagConfiguration.class);
            assertThat(context).doesNotHaveBean(ChatbotController.class);
            assertThat(context).doesNotHaveBean(RagKnowledgeController.class);
            assertThat(context).doesNotHaveBean(ProblemAdvice.class);
            assertThat(context).doesNotHaveBean(RagImportRunner.class);
            assertThat(context).doesNotHaveBean(ChatbotService.class);
            assertThat(context).doesNotHaveBean(ChatbotGateway.class);
            assertThat(context).doesNotHaveBean(RagDocumentRepository.class);
            assertThat(context).doesNotHaveBean(DataSource.class);
        });
    }

    @Test void existingDevProfileAloneDoesNotActivateRagOrInitializeItsSchema() {
        DataSource existing = existingDataSource();
        runner.withInitializer(context -> context.getEnvironment().setActiveProfiles("dev"))
            .withBean("existingDataSource", DataSource.class, () -> existing)
            .withPropertyValues("rag.schema.initialize=true")
            .run(context -> {
                assertThat(context).hasNotFailed().hasSingleBean(DataSource.class);
                assertThat(context.getBean(DataSource.class)).isSameAs(existing);
                assertThat(context).doesNotHaveBean(RagConfiguration.class);
                assertThat(context).doesNotHaveBean(ChatbotController.class);
                assertThat(context).doesNotHaveBean(ProblemAdvice.class);
                assertThat(context).doesNotHaveBean(RagDocumentRepository.class);
                try (Connection connection = existing.getConnection(); ResultSet tables = connection.getMetaData()
                        .getTables(null, null, "AI_RAG_DOCUMENTS", null)) {
                    assertThat(tables.next()).isFalse();
                }
            });
    }

    @Test void ragAloneFailsWithDbProfileGuidanceBeforeAnyEmbeddedDatabaseFallback() {
        runner.withInitializer(context -> {
                context.getEnvironment().setDefaultProfiles("dev");
                context.getEnvironment().setActiveProfiles("rag");
            })
            .run(context -> {
                assertThat(context).hasFailed();
                assertThat(context.getStartupFailure()).hasRootCauseInstanceOf(IllegalStateException.class)
                    .hasStackTraceContaining("기존 DB 프로필");
            });
    }

    @Test void importProfileWithoutRagDoesNotActivateTheImporterOrControllers() {
        runner.withInitializer(context -> context.getEnvironment().setActiveProfiles("rag-import"))
            .run(context -> {
                assertThat(context).hasNotFailed();
                assertThat(context).doesNotHaveBean(RagImportRunner.class);
                assertThat(context).doesNotHaveBean(RagConfiguration.class);
                assertThat(context).doesNotHaveBean(ChatbotController.class);
                assertThat(context).doesNotHaveBean(RagKnowledgeController.class);
                assertThat(context).doesNotHaveBean(ProblemAdvice.class);
                assertThat(context).doesNotHaveBean(PublicDataImporter.class);
            });
    }

    @Test void devAndRagShareTheExactExistingDataSourceAndKeepExistingTables() {
        DataSource existing = existingDataSource();
        try (Connection connection = existing.getConnection(); Statement statement = connection.createStatement()) {
            statement.execute("CREATE TABLE community_posts(id BIGINT PRIMARY KEY,title VARCHAR(120))");
            statement.execute("INSERT INTO community_posts VALUES(73,'keep existing post')");
        } catch (Exception error) { throw new AssertionError(error); }

        activeRunner(existing).withPropertyValues("rag.schema.initialize=true").run(context -> {
            assertThat(context).hasNotFailed().hasSingleBean(DataSource.class);
            assertThat(context.getBean(DataSource.class)).isSameAs(existing);
            assertThat(context).hasSingleBean(RagConfiguration.class).hasSingleBean(ChatbotController.class)
                .hasSingleBean(RagKnowledgeController.class).hasSingleBean(ProblemAdvice.class);
            assertThat(context).doesNotHaveBean(RagImportRunner.class);
            RagDocumentRepository repository = context.getBean(RagDocumentRepository.class);
            assertThat(ReflectionTestUtils.getField(repository, "dataSource")).isSameAs(existing);
            RagDocument document = RagDocument.create("WELFARE", "profile-test", "POLICY", "공유 DB 시험 자료",
                "새 AI 저장소가 기존 앱과 같은 데이터베이스 연결을 사용한다는 것을 확인하는 시험 본문입니다.",
                "https://www.data.go.kr/data/15090532/openapi.do", "", Instant.parse("2026-10-24T00:00:00Z"));
            repository.upsertAll(List.of(document));
            try (Connection connection = existing.getConnection(); Statement statement = connection.createStatement()) {
                try (ResultSet rows = statement.executeQuery("SELECT id FROM ai_rag_documents")) {
                    assertThat(rows.next()).isTrue();
                    assertThat(rows.getString(1)).isEqualTo(document.id());
                    assertThat(rows.next()).isFalse();
                }
                try (ResultSet rows = statement.executeQuery("SELECT title FROM community_posts WHERE id=73")) {
                    assertThat(rows.next()).isTrue();
                    assertThat(rows.getString(1)).isEqualTo("keep existing post");
                }
            }
        });
    }

    @Test void existingDbWithoutExplicitSchemaInitializationFailsClearlyRatherThanCreatingTables() {
        DataSource existing = existingDataSource();
        activeRunner(existing).withPropertyValues("rag.schema.initialize=false").run(context -> {
            assertThat(context).hasFailed();
            Throwable cause = context.getStartupFailure();
            while (cause.getCause() != null) cause = cause.getCause();
            assertThat(cause).isInstanceOfSatisfying(Problem.class,
                problem -> assertThat(problem.code()).isEqualTo("RAG_DB_UNAVAILABLE"));
        });
    }

    private ApplicationContextRunner activeRunner(DataSource existing) {
        return runner.withInitializer(context -> context.getEnvironment().setActiveProfiles("dev", "rag"))
            .withBean("existingDataSource", DataSource.class, () -> existing)
            .withPropertyValues("rag.gemini.api-key=", "rag.public-data.service-key=", "rag.gemini.model=test-model");
    }

    private static DataSource existingDataSource() {
        return new DriverManagerDataSource("jdbc:h2:mem:rag-profile-" + UUID.randomUUID()
            + ";MODE=MySQL;DB_CLOSE_DELAY=-1", "sa", "");
    }
}
