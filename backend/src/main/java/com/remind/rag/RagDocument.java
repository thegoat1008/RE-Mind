package com.remind.rag;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.HexFormat;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

/** Immutable public-source record. API credentials are never part of this record. */
public record RagDocument(String id, String provider, String externalId, String kind,
        String title, String content, String sourceUrl, String sourceUpdatedAt,
        Instant fetchedAt, String contentHash) {
    public static final int MAX_CONTENT_LENGTH = 100_000;
    private static final Map<String, String> PROVIDER_KINDS = Map.of(
        "WELFARE", "POLICY", "HIRA", "HOSPITAL", "ODCLOUD", "EVENT");
    private static final Set<String> OFFICIAL_HOSTS = Set.of("data.go.kr", "bokjiro.go.kr", "nid.or.kr");

    public RagDocument {
        require(provider != null && PROVIDER_KINDS.containsKey(provider), "Invalid source provider");
        require(PROVIDER_KINDS.get(provider).equals(kind), "Invalid source kind");
        require(externalId != null && !externalId.isBlank() && externalId.length() <= 200
            && externalId.chars().noneMatch(Character::isISOControl), "Invalid external ID");
        require(title != null && !title.isBlank() && title.length() <= 200, "Invalid source title");
        require(content != null && !content.isBlank() && content.length() <= MAX_CONTENT_LENGTH,
            "Invalid source content");
        require(fetchedAt != null, "Missing fetch time");
        require(sourceUpdatedAt != null && sourceUpdatedAt.length() <= 100
            && sourceUpdatedAt.chars().noneMatch(Character::isISOControl), "Invalid source update time");
        require(safeSourceUrl(sourceUrl), "Invalid public source URL");
        require(hash(provider + "\0" + externalId).equals(id), "Invalid document ID");
        require(hash(content).equals(contentHash), "Invalid content hash");
    }

    public static RagDocument create(String provider, String externalId, String kind, String title,
            String content, String sourceUrl, String sourceUpdatedAt, Instant fetchedAt) {
        return new RagDocument(hash(provider + "\0" + externalId), provider, externalId, kind, title,
            content, sourceUrl, sourceUpdatedAt == null ? "" : sourceUpdatedAt, fetchedAt,
            content == null ? "" : hash(content));
    }

    private static boolean safeSourceUrl(String value) {
        if (value == null || value.isBlank() || value.length() > 2048) return false;
        try {
            URI uri = URI.create(value);
            String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase(Locale.ROOT);
            boolean official = OFFICIAL_HOSTS.stream().anyMatch(h -> host.equals(h)
                || (h.equals("data.go.kr") ? host.equals("www.data.go.kr") : host.endsWith("." + h)));
            if (!"https".equalsIgnoreCase(uri.getScheme()) || !official || uri.getRawUserInfo() != null
                || (uri.getPort() != -1 && uri.getPort() != 443) || uri.getRawFragment() != null) return false;
            String query = uri.getRawQuery();
            if (query == null) return true;
            for (int decode = 0; decode < 3; decode++) {
                query = URLDecoder.decode(query, StandardCharsets.UTF_8);
                for (String part : query.split("[&;]")) {
                    String name = part.split("=", 2)[0].replaceAll("[^A-Za-z0-9]", "").toLowerCase(Locale.ROOT);
                    if (name.contains("key") || name.contains("token") || name.contains("secret")
                        || name.contains("password") || name.contains("auth") || name.contains("credential")) return false;
                }
            }
            return true;
        } catch (IllegalArgumentException ignored) { return false; }
    }

    private static String hash(String value) {
        try {
            return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256")
                .digest(value.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException impossible) { throw new IllegalStateException("SHA-256 is unavailable", impossible); }
    }
    private static void require(boolean valid, String message) {
        if (!valid) throw new IllegalArgumentException(message);
    }
}
