package com.remind.rag;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import static org.junit.jupiter.api.Assertions.*;

class DatabaseKnowledgeSearchTest {
    private RagDocumentRepository repository;
    private MutableClock clock;
    private DatabaseKnowledgeSearch search;

    @BeforeEach void setup() {
        repository = new RagDocumentRepository(new DriverManagerDataSource(
            "jdbc:h2:mem:search-" + UUID.randomUUID() + ";MODE=MySQL;DB_CLOSE_DELAY=-1", "sa", ""));
        repository.initializeSchema();
        clock = new MutableClock(Instant.parse("2026-10-24T00:00:00Z"));
        search = new DatabaseKnowledgeSearch(repository, clock);
    }

    @Test void ttlAndManualInvalidationReloadDbSnapshot() {
        repository.upsertAll(List.of(policy("처음의 장기요양 신청 안내입니다.")));
        assertTrue(search.search("장기요양").get(0).text().contains("처음"));
        repository.upsertAll(List.of(policy("수정된 장기요양 신청 안내입니다.")));
        assertTrue(search.search("장기요양").get(0).text().contains("처음"));
        clock.now = clock.now.plusSeconds(30);
        assertTrue(search.search("장기요양").get(0).text().contains("수정"));
        repository.upsertAll(List.of(policy("다시 바뀐 장기요양 신청 안내입니다.")));
        search.invalidate();
        assertTrue(search.search("장기요양").get(0).text().contains("다시"));
    }

    @Test void explicitSourceRoutingNeverMixesEventsOrHospitalsIntoEligibilityFacts() {
        repository.upsertAll(List.of(policy("치매 지원금 자격조건과 장기요양 신청 안내입니다."),
            RagDocument.create("HIRA", "h1", "HOSPITAL", "서울 치매 병원", "서울에 있는 치매 병원 위치와 주소 안내입니다.",
                "https://www.data.go.kr/data/15001698/openapi.do", "", clock.instant()),
            RagDocument.create("ODCLOUD", "e1", "EVENT", "치매 가족 프로그램", "치매 가족 프로그램 행사 모집과 참여 일정 안내입니다.",
                "https://www.data.go.kr/data/15161440/fileData.do", "2026-08-19", clock.instant())));
        assertOnlyKind("HOSPITAL", search.search("서울 치매 병원 위치 어디야?"));
        assertOnlyKind("EVENT", search.search("치매 가족 프로그램 모집 알려줘"));
        assertOnlyKind("POLICY", search.search("치매 프로그램 지원금 자격조건 알려줘"));
        assertEquals("POLICY", DatabaseKnowledgeSearch.sourceKind("병원비 지원금 신청 조건"));
        assertEquals("POLICY", DatabaseKnowledgeSearch.sourceKind("장기요양은 누구나 받을 수 있나요?"));
    }

    @Test void emptyDatabaseProducesNoMatchRatherThanOldDemoSummaries() {
        assertTrue(search.search("가족요양비 알려줘").isEmpty());
        assertTrue(search.search("서울 병원 위치").isEmpty());
        assertTrue(search.search("치매 프로그램 모집").isEmpty());
    }

    private RagDocument policy(String content) {
        return RagDocument.create("WELFARE", "policy-1", "POLICY", "치매 지원과 장기요양 안내", content,
            "https://www.data.go.kr/data/15090532/openapi.do", "2026", clock.instant());
    }
    private static void assertOnlyKind(String kind, List<Models.Knowledge> result) {
        assertFalse(result.isEmpty());
        assertTrue(result.stream().allMatch(k -> kind.equals(k.category())));
    }
    private static final class MutableClock extends Clock {
        Instant now;
        MutableClock(Instant now) { this.now = now; }
        @Override public ZoneId getZone() { return ZoneId.of("Asia/Seoul"); }
        @Override public Clock withZone(ZoneId zone) { return this; }
        @Override public Instant instant() { return now; }
    }
}
