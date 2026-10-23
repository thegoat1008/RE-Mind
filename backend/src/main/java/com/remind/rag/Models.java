package com.remind.rag;

import java.util.List;

/** AI/RAG contracts only: there are no calendar or community write actions. */
public final class Models {
    private Models() { }
    public record Knowledge(String id, String title, String category, String text, String sourceUrl,
                            String reviewedAt, List<String> keywords, String fetchedAt, String sourceUpdatedAt) {
        public Knowledge(String id, String title, String category, String text, String sourceUrl,
                         String reviewedAt, List<String> keywords) {
            this(id,title,category,text,sourceUrl,reviewedAt,keywords,"","");
        }
    }
    public record Source(String id,String title,String text,String sourceUrl,String reviewedAt,
                         String fetchedAt,String sourceUpdatedAt,String sourceKind) {
        public Source(String id,String title,String text,String sourceUrl,String reviewedAt) {
            this(id,title,text,sourceUrl,reviewedAt,"","","");
        }
    }
    public record Evidence(String chunkId,String quote) { }
    public record RagInfo(String status,String method,int retrievedChunks) { }
    public record ModelPlan(String reply,List<String> sourceIds,List<Evidence> evidence) { }
    public record Error(String code,String message,boolean retryable) { }
}
