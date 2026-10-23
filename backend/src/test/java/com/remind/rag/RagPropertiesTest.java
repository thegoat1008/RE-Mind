package com.remind.rag;

import java.util.Properties;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.*;

class RagPropertiesTest {
    @Test void packagedDefaultSearchTermSurvivesJavaPropertiesEncoding() throws Exception {
        Properties properties=new Properties();
        try(var stream=getClass().getResourceAsStream("/application-rag.properties")) {
            assertThat(stream).isNotNull();
            properties.load(stream);
        }
        assertThat(properties.getProperty("rag.import.query")).isEqualTo("${RAG_IMPORT_QUERY:치매}");
    }
}
