package com.remind.rag;

import java.io.IOException;
import java.util.Arrays;
import java.util.UUID;
import javax.sql.DataSource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.core.env.Profiles;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.ResourcePropertySource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.*;

/** Uses an injected H2 stand-in; does not open MySQL, import .env, or load any credentials. */
class RagMysqlProfileTest {
    @Test void explicitLocalMysqlProfileDoesNotActivateDevOrRequireAivenCaAndSharesExistingDataSource() {
        DataSource existing = new DriverManagerDataSource("jdbc:h2:mem:rag-mysql-profile-" + UUID.randomUUID()
            + ";MODE=MySQL;DB_CLOSE_DELAY=-1", "sa", "");
        // The surrounding application has already supplied its DataSource and AI schema.
        // RAG must reuse that exact instance without triggering implicit schema creation.
        new RagDocumentRepository(existing).initializeSchema();

        new ApplicationContextRunner().withUserConfiguration(RagConfiguration.class)
            .withInitializer(context -> {
                context.getEnvironment().setDefaultProfiles("dev");
                context.getEnvironment().setActiveProfiles("rag-mysql", "rag");
                try {
                    ResourcePropertySource localProfile = new ResourcePropertySource("ragMysqlProfile",
                        new ClassPathResource("application-rag-mysql.properties"));
                    // Only inspect public property names here, never passwords or environment-file values.
                    assertThat(Arrays.stream(localProfile.getPropertyNames())
                        .noneMatch(name -> name.toLowerCase(java.util.Locale.ROOT).contains("trustcertificate")))
                        .isTrue();
                    // Register this public profile directly. ConfigData imports and .env files are never executed.
                    context.getEnvironment().getPropertySources().addLast(localProfile);
                } catch (IOException error) {
                    throw new IllegalStateException("Local-only RAG MySQL profile resource is missing", error);
                }
            })
            .withBean("existingApplicationDataSource", DataSource.class, () -> existing)
            .withPropertyValues("rag.schema.initialize=false", "rag.gemini.api-key=",
                "rag.public-data.service-key=", "rag.gemini.model=test-model")
            .run(context -> {
                assertThat(context).hasNotFailed().hasSingleBean(DataSource.class);
                assertThat(context.getEnvironment().getActiveProfiles()).containsExactly("rag-mysql", "rag");
                assertThat(context.getEnvironment().acceptsProfiles(Profiles.of("dev", "oni", "rag-local"))).isFalse();
                assertThat(context.getEnvironment().getProperty("spring.jpa.hibernate.ddl-auto")).isEqualTo("none");
                assertThat(context.getEnvironment().getProperty("server.address")).isEqualTo("127.0.0.1");
                assertThat(context.getBean(DataSource.class)).isSameAs(existing);
                assertThat(ReflectionTestUtils.getField(context.getBean(RagDocumentRepository.class), "dataSource"))
                    .isSameAs(existing);
                assertThat(context.getBean(RagDocumentRepository.class).counts().values()).containsOnly(0L);
            });
    }
}
