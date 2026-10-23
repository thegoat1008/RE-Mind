package com.remind.rag;

import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RagDocumentTest {
    private static final Instant NOW = Instant.parse("2026-10-24T00:00:00Z");

    @Test void deterministicIdentityAndHashSeparateSourceFromContentChanges() {
        RagDocument one = document("원래 내용", "https://www.data.go.kr/data/15090532/openapi.do");
        RagDocument same = document("원래 내용", "https://www.data.go.kr/data/15090532/openapi.do");
        RagDocument changed = document("바뀐 내용", "https://www.data.go.kr/data/15090532/openapi.do");
        assertEquals(one, same);
        assertEquals(64, one.id().length());
        assertEquals(one.id(), changed.id());
        assertNotEquals(one.contentHash(), changed.contentHash());
        assertEquals("", one.sourceUpdatedAt());
    }

    @Test void sourceUrlsAreOfficialHttpsAndCannotCarryCredentials() {
        for (String url : List.of("http://www.data.go.kr/data/1", "https://evil.example/data/1",
            "https://data.go.kr.evil.example/data/1", "https://token@www.data.go.kr/data/1",
            "https://www.data.go.kr:8443/data/1", "https://www.data.go.kr/data/1#secret",
            "https://www.data.go.kr/data/1?serviceKey=secret", "https://www.bokjiro.go.kr/?api_key=secret",
            "https://www.data.go.kr/?service%4Bey=secret", "https://www.data.go.kr/?access_token=secret")) {
            assertThrows(IllegalArgumentException.class, () -> document("내용", url));
        }
        assertDoesNotThrow(() -> document("내용", "https://www.bokjiro.go.kr/info?wlfareInfoId=WLF001"));
        assertDoesNotThrow(() -> document("내용", "https://seoul.nid.or.kr/event/1"));
    }

    @Test void rejectsMismatchedProviderKindHashesAndOversizedText() {
        assertThrows(IllegalArgumentException.class, () -> RagDocument.create("WELFARE", "id", "EVENT", "제목", "내용",
            "https://www.data.go.kr/data/1", "", NOW));
        assertThrows(IllegalArgumentException.class, () -> document(" ", "https://www.data.go.kr/data/1"));
        assertThrows(IllegalArgumentException.class, () -> document("가".repeat(100_001), "https://www.data.go.kr/data/1"));
        RagDocument valid = document("내용", "https://www.data.go.kr/data/1");
        assertThrows(IllegalArgumentException.class, () -> new RagDocument(valid.id(), valid.provider(), valid.externalId(), valid.kind(),
            valid.title(), valid.content(), valid.sourceUrl(), valid.sourceUpdatedAt(), NOW, "0".repeat(64)));
    }

    private static RagDocument document(String content, String url) {
        return RagDocument.create("WELFARE", "external-1", "POLICY", "공식 자료", content, url, null, NOW);
    }
}
