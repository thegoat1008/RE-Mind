package com.remind.rag;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/** Explicit non-web import command; there is no public ingestion/admin endpoint. */
@Component
@Profile("rag & rag-import")
public final class RagImportRunner implements ApplicationRunner {
    private final PublicDataImporter importer;
    private final ConfigurableApplicationContext context;
    private final String source,query,sidoCode;
    private final int pages,details;
    public RagImportRunner(PublicDataImporter importer,ConfigurableApplicationContext context,
            @Value("${rag.import.source:welfare}") String source,
            @Value("${rag.import.query:치매}") String query,
            @Value("${rag.import.sido-code:}") String sidoCode,
            @Value("${rag.import.max-pages:1}") int pages,
            @Value("${rag.import.max-details:10}") int details) {
        this.importer=importer;this.context=context;this.source=source;this.query=query;
        this.sidoCode=sidoCode;this.pages=pages;this.details=details;
    }
    @Override public void run(ApplicationArguments arguments) {
        if(context.getEnvironment().getProperty("spring.main.web-application-type","servlet").equalsIgnoreCase("none")) {
            try {
                PublicDataImporter.ImportResult result=importer.importSource(source,query,sidoCode,pages,details);
                System.out.println("RAG_IMPORT source="+result.source()+" fetched="+result.fetched()+" stored="+result.stored()+" status="+result.status());
            } catch(Problem problem) {
                throw new IllegalStateException("RAG_IMPORT_FAILED "+problem.code()+": "+problem.getMessage());
            } catch(IllegalArgumentException problem) {
                String reason=problem.getMessage();
                java.util.Set<String> safe=java.util.Set.of("Invalid source provider","Invalid source kind",
                    "Invalid external ID","Invalid source title","Invalid source content","Missing fetch time",
                    "Invalid source update time","Invalid public source URL","Invalid document ID","Invalid content hash",
                    "maxDetails must be 1..10","maxPages must be 1..5","Search query must be at most 100 printable characters",
                    "sidoCode must be an official six-digit HIRA code","source must be welfare, hospital, or events");
                throw new IllegalStateException("RAG_IMPORT_FAILED: "+(reason!=null && safe.contains(reason)?reason:"수집 종류·검색어·페이지 제한 설정을 확인하세요."));
            } finally { context.close(); }
        } else throw new IllegalStateException("rag-import는 --spring.main.web-application-type=none 설정으로만 실행하세요.");
    }
}
