package com.remind.rag;

import java.util.List;

/** Fetch fully before the transaction, so a provider failure never replaces the last good corpus. */
public final class PublicDataImporter {
    public record ImportResult(String source, int fetched, int stored, String status) { }
    private final PublicDataClient client;
    private final RagDocumentRepository repository;
    private final DatabaseKnowledgeSearch search;

    public PublicDataImporter(PublicDataClient client, RagDocumentRepository repository, DatabaseKnowledgeSearch search) {
        this.client = client;
        this.repository = repository;
        this.search = search;
    }

    public ImportResult importSource(String source, String query, String sidoCode, int maxPages, int maxDetails) {
        List<RagDocument> documents = switch (source) {
            case "welfare" -> client.welfare(query, maxPages, maxDetails);
            case "hospital" -> client.hospitals(query, sidoCode, maxPages);
            case "events" -> client.events(maxPages);
            default -> throw new IllegalArgumentException("source must be welfare, hospital, or events");
        };
        repository.upsertAll(documents);
        search.invalidate();
        return new ImportResult(source, documents.size(), documents.size(), "IMPORTED");
    }
}
