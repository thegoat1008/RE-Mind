package com.remind.ai;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PolicyCatalogTest {
    private final PolicyCatalog catalog = new PolicyCatalog();

    @Test void findsSpecificVerifiedHomeCareInformation() {
        var results = catalog.search("방문요양 신청 방법 알려주세요", "서울");
        assertFalse(results.isEmpty());
        assertEquals("long-term-home-care", results.get(0).id());
        assertTrue(results.get(0).sourceUrl().startsWith("https://www.nhis.or.kr/"));
    }

    @Test void unknownPolicyDoesNotReturnRandomPrograms() {
        assertTrue(catalog.search("외계인 돌봄 지원금 있어요?", "서울").isEmpty());
        assertTrue(catalog.search("치매 치료비 지원은 얼마인가요", "서울").isEmpty());
        assertTrue(catalog.search("정책 알려줘", "서울").isEmpty());
        assertTrue(catalog.search("오늘 날씨는 어때", null).isEmpty());
    }

    @Test void regionDoesNotInventMunicipalityRecordOrEligibility() {
        var results = catalog.search("가족교실 알려줘", "부산");
        assertEquals(1, results.size());
        assertFalse(results.get(0).title().contains("부산"));
        assertTrue(results.get(0).summary().contains("확인"));
    }

    @Test void sourceRecordsHaveEvidenceAndVerificationDates() {
        for (String query : new String[]{"가족교실", "자조모임", "힐링", "동반치매환자", "방문요양", "주간보호"}) {
            var results = catalog.search(query, null);
            assertFalse(results.isEmpty(), query);
            for (var policy : results) {
                assertTrue(policy.sourceUrl().startsWith("https://www.easylaw.go.kr/")
                        || policy.sourceUrl().startsWith("https://www.nhis.or.kr/"));
                assertEquals("2026-10-23", policy.verifiedAt());
                assertFalse(policy.eligibility().isBlank());
            }
        }
    }
}
