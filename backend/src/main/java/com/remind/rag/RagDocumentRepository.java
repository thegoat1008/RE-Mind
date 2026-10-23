package com.remind.rag;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.sql.DataSource;

/** Uses the existing application's DataSource. Only ai_rag_documents is touched. */
public final class RagDocumentRepository {
    private static final Set<String> KINDS = Set.of("POLICY", "HOSPITAL", "EVENT");
    private static final int MAX_PER_KIND = 1000;
    private static final String COLUMNS = "id,provider,external_id,kind,title,content,source_url,source_updated_at,fetched_at,content_hash";
    private static final String INSERT = "INSERT INTO ai_rag_documents (" + COLUMNS + ",active) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    private static final String UPDATE = "UPDATE ai_rag_documents SET provider=?,external_id=?,kind=?,title=?,content=?,source_url=?,source_updated_at=?,fetched_at=?,content_hash=?,active=? WHERE id=?";
    private final DataSource dataSource;

    public RagDocumentRepository(DataSource dataSource) { this.dataSource = java.util.Objects.requireNonNull(dataSource); }

    /** Must only be invoked by an explicit operator setting; never by the constructor. */
    public void initializeSchema() {
        try (InputStream input = RagDocumentRepository.class.getResourceAsStream("/rag/schema.sql")) {
            if (input == null) throw databaseProblem();
            byte[] bytes = input.readNBytes(65_537);
            if (bytes.length > 65_536) throw databaseProblem();
            String sql = new String(bytes, StandardCharsets.UTF_8);
            try (Connection connection = dataSource.getConnection(); Statement statement = connection.createStatement()) {
                for (String part : sql.split(";")) if (!part.isBlank()) statement.execute(part);
            }
        } catch (Problem expected) { throw expected; }
        catch (Exception ignored) { throw databaseProblem(); }
    }

    /** Complete fetched batches commit together. Partial fetches never delete older rows. */
    public synchronized void upsertAll(List<RagDocument> documents) {
        if (documents == null || documents.size() > MAX_PER_KIND * KINDS.size()
            || documents.stream().anyMatch(java.util.Objects::isNull))
            throw new IllegalArgumentException("Invalid document batch");
        Map<String, RagDocument> unique = new LinkedHashMap<>();
        documents.forEach(d -> unique.put(d.id(), d));
        if (unique.isEmpty()) return;
        try (Connection connection = dataSource.getConnection()) {
            connection.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);
            connection.setAutoCommit(false);
            try {
                try (PreparedStatement update = connection.prepareStatement(UPDATE);
                     PreparedStatement insert = connection.prepareStatement(INSERT)) {
                    for (RagDocument document : unique.values()) {
                        bindUpdate(update, document);
                        if (update.executeUpdate() == 0) {
                            bindInsert(insert, document);
                            try { insert.executeUpdate(); }
                            catch (SQLException collision) {
                                // A concurrent importer can insert the same deterministic
                                // ID. Retrying UPDATE handles that race without deleting it.
                                if (collision.getSQLState() == null || !collision.getSQLState().startsWith("23")) throw collision;
                                bindUpdate(update, document);
                                if (update.executeUpdate() == 0 && !exists(connection, document.id())) throw collision;
                            }
                        }
                    }
                }
                if (readCounts(connection).values().stream().anyMatch(count -> count > MAX_PER_KIND))
                    throw new Problem(409, "RAG_DOCUMENT_LIMIT", "자료 종류별 보관 한도 1,000건을 초과했습니다. 기존 자료는 유지됩니다.", false);
                connection.commit();
            } catch (SQLException | RuntimeException error) {
                try { connection.rollback(); } catch (SQLException ignored) { }
                if (error instanceof Problem expected) throw expected;
                throw databaseProblem();
            }
        } catch (Problem expected) { throw expected; }
        catch (SQLException ignored) { throw databaseProblem(); }
    }

    public List<RagDocument> findActive(String kind, int limit) {
        if (kind == null || !KINDS.contains(kind) || limit < 1 || limit > MAX_PER_KIND)
            throw new IllegalArgumentException("Invalid document query");
        String sql = "SELECT " + COLUMNS + " FROM ai_rag_documents WHERE active=? AND kind=? ORDER BY id LIMIT ?";
        try (Connection connection = dataSource.getConnection(); PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setBoolean(1, true); statement.setString(2, kind); statement.setInt(3, limit);
            try (ResultSet rows = statement.executeQuery()) {
                List<RagDocument> result = new ArrayList<>();
                while (rows.next()) result.add(new RagDocument(rows.getString("id"), rows.getString("provider"),
                    rows.getString("external_id"), rows.getString("kind"), rows.getString("title"),
                    rows.getString("content"), rows.getString("source_url"), rows.getString("source_updated_at"),
                    Instant.parse(rows.getString("fetched_at")), rows.getString("content_hash")));
                return List.copyOf(result);
            }
        } catch (SQLException | RuntimeException ignored) { throw databaseProblem(); }
    }

    public Map<String, Long> counts() {
        try (Connection connection = dataSource.getConnection()) { return readCounts(connection); }
        catch (SQLException ignored) { throw databaseProblem(); }
    }
    private static Map<String, Long> readCounts(Connection connection) throws SQLException {
        Map<String, Long> counts = new LinkedHashMap<>();
        counts.put("POLICY", 0L); counts.put("HOSPITAL", 0L); counts.put("EVENT", 0L);
        try (PreparedStatement statement = connection.prepareStatement("SELECT kind,COUNT(*) AS total FROM ai_rag_documents WHERE active=? GROUP BY kind")) {
            statement.setBoolean(1, true);
            try (ResultSet rows = statement.executeQuery()) {
                while (rows.next()) {
                    String kind = rows.getString("kind");
                    if (!KINDS.contains(kind)) throw databaseProblem();
                    counts.put(kind, rows.getLong("total"));
                }
            }
        }
        return Map.copyOf(counts);
    }

    private static void bindInsert(PreparedStatement statement, RagDocument d) throws SQLException {
        statement.setString(1, d.id()); statement.setString(2, d.provider()); statement.setString(3, d.externalId());
        statement.setString(4, d.kind()); statement.setString(5, d.title()); statement.setString(6, d.content());
        statement.setString(7, d.sourceUrl()); statement.setString(8, d.sourceUpdatedAt());
        statement.setString(9, d.fetchedAt().toString()); statement.setString(10, d.contentHash()); statement.setBoolean(11, true);
    }
    private static boolean exists(Connection connection, String id) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement("SELECT id FROM ai_rag_documents WHERE id=?")) {
            statement.setString(1, id);
            try (ResultSet rows = statement.executeQuery()) { return rows.next(); }
        }
    }
    private static void bindUpdate(PreparedStatement statement, RagDocument d) throws SQLException {
        statement.setString(1, d.provider()); statement.setString(2, d.externalId()); statement.setString(3, d.kind());
        statement.setString(4, d.title()); statement.setString(5, d.content()); statement.setString(6, d.sourceUrl());
        statement.setString(7, d.sourceUpdatedAt()); statement.setString(8, d.fetchedAt().toString());
        statement.setString(9, d.contentHash()); statement.setBoolean(10, true); statement.setString(11, d.id());
    }
    private static Problem databaseProblem() {
        return new Problem(503, "RAG_DB_UNAVAILABLE", "공식 자료 DB를 읽거나 저장하지 못했습니다. DB 설정과 RAG 스키마를 확인해 주세요.", true);
    }
}
