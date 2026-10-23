CREATE TABLE IF NOT EXISTS ai_rag_documents (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    provider VARCHAR(16) NOT NULL,
    external_id VARCHAR(200) NOT NULL,
    kind VARCHAR(16) NOT NULL,
    title VARCHAR(200) NOT NULL,
    content LONGTEXT NOT NULL,
    source_url VARCHAR(2048) NOT NULL,
    source_updated_at VARCHAR(100) NOT NULL,
    fetched_at VARCHAR(40) NOT NULL,
    content_hash VARCHAR(64) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_ai_rag_provider_external UNIQUE (provider, external_id)
);
