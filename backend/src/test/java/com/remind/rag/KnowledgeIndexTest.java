package com.remind.rag;

import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class KnowledgeIndexTest {
    @Test void returnsExactChunkWithSourceDatesAndNoClaimOfHumanReview() {
        RagDocument doc = document("family", "가족요양비 안내", "가족요양비에는 별도의 법령상 지급 요건이 있습니다. 가족이 돌본다는 이유만으로 누구나 지급되는 것은 아닙니다.");
        var result = new KnowledgeIndex(List.of(doc)).search("가족요양비는 누구나 받을 수 있나요?");
        assertEquals(1, result.size());
        Models.Knowledge chunk = result.get(0);
        assertTrue(doc.content().contains(chunk.text()));
        assertEquals("POLICY", chunk.category());
        assertEquals(doc.sourceUrl(), chunk.sourceUrl());
        assertEquals("", chunk.reviewedAt());
        assertEquals(doc.fetchedAt().toString(), chunk.fetchedAt());
        assertEquals(doc.sourceUpdatedAt(), chunk.sourceUpdatedAt());
    }

    @Test void chunksLongDocumentsWithoutInventingTextAndBoundsResultDiversity() {
        RagDocument one = document("one", "장기요양인정", "장기요양 인정 신청과 조사, 장기요양 등급판정 절차를 안내합니다. ".repeat(90));
        RagDocument two = document("two", "장기요양 급여", "장기요양 급여 신청과 이용 절차를 확인합니다. ".repeat(90));
        RagDocument three = document("three", "장기요양 지원", "장기요양 지원 신청에 필요한 절차를 안내합니다. ".repeat(90));
        List<RagDocument> docs = List.of(one, two, three);
        var result = new KnowledgeIndex(docs).search("장기요양 신청 절차");
        assertEquals(4, result.size());
        for (Models.Knowledge chunk : result) {
            RagDocument source = docs.stream().filter(d -> chunk.id().startsWith(d.id() + ":chunk-")).findFirst().orElseThrow();
            assertTrue(source.content().contains(chunk.text()));
            assertTrue(chunk.text().length() <= 480);
            assertTrue(result.stream().filter(k -> k.id().startsWith(source.id() + ":chunk-")).count() <= 2);
        }
    }

    @Test void unrelatedQueryOrEmptyDatabaseHasNoBundledFallback() {
        KnowledgeIndex empty = new KnowledgeIndex(List.of());
        assertTrue(empty.search("가족요양비 알려줘").isEmpty());
        assertTrue(new KnowledgeIndex(List.of(document("one", "장기요양", "장기요양 인정 신청 안내입니다.")))
            .search("목성 위성 천문학 관측").isEmpty());
        assertTrue(empty.search(null).isEmpty());
    }

    private static RagDocument document(String id, String title, String content) {
        return RagDocument.create("WELFARE", id, "POLICY", title, content,
            "https://www.data.go.kr/data/15090532/openapi.do", "2026-10-23", Instant.parse("2026-10-24T00:00:00Z"));
    }
}
