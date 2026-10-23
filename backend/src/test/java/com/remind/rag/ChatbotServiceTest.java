package com.remind.rag;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpSession;

import static org.junit.jupiter.api.Assertions.*;

class ChatbotServiceTest {
    private static final Clock CLOCK = Clock.fixed(Instant.parse("2026-10-23T18:00:00Z"), ZoneId.of("Asia/Seoul"));
    // Synthetic public-policy test text; never loaded into production or represented as live API data.
    private static final RagDocument FAMILY_DOCUMENT = RagDocument.create("WELFARE", "test-family-benefit", "POLICY",
        "가족요양비 시험 자료", "가족요양비에는 별도의 요건이 있습니다. 가족이 돌본다는 사실만으로 누구나 지급받는다는 뜻이 아닙니다. "
            + "가족요양비 신청 서류와 대상 조건은 담당 기관의 최신 안내에서 확인해야 합니다.",
        "https://www.data.go.kr/data/15072392/openapi.do", "2026-10-23", Instant.parse("2026-10-24T00:00:00Z"));
    private static final RagDocument HOSPITAL_DOCUMENT = RagDocument.create("HIRA", "test-hospital", "HOSPITAL",
        "서울 시험병원", "서울 근처의 병원 위치와 주소를 확인하기 위한 시험 자료입니다. "
            + "실제 기관이나 현재 진료 가능 여부를 나타내지 않습니다.",
        "https://www.data.go.kr/data/15001698/openapi.do", "", Instant.parse("2026-10-24T00:00:00Z"));
    private KnowledgeSearch knowledge;
    private StubGateway gateway;
    private ChatbotService service;
    private MockHttpSession session;

    @BeforeEach void setup() {
        KnowledgeIndex index = new KnowledgeIndex(List.of(FAMILY_DOCUMENT));
        knowledge = index::search;
        gateway = new StubGateway();
        service = new ChatbotService(gateway, knowledge, CLOCK);
        session = new MockHttpSession();
    }

    @Test void actualPreviousMessagesAreSentAsHistoryAndCurrentTurnOnlyOnce() {
        service.chat(session, request("내 이름은 테스트별명이야"));
        service.chat(session, request("내가 뭐라고 했지?"));
        ChatbotDtos.Context context = gateway.contexts.get(1);
        assertEquals("내가 뭐라고 했지?", context.message());
        assertEquals(List.of(new ChatbotDtos.Turn("user", "내 이름은 테스트별명이야"),
            new ChatbotDtos.Turn("assistant", "응답: 내 이름은 테스트별명이야")), context.history());
        assertEquals("2026-10-24", context.today());
        assertEquals("Asia/Seoul", context.timezone());
        assertEquals(4, service.detail(session).messages().size());
        assertEquals("user", service.detail(session).messages().get(2).role());
    }

    @Test void retryReturnsOriginalResponseAndChangedBodyOrInputKindConflicts() {
        var request = request("안녕");
        var first = service.chat(session, request);
        assertEquals(first, service.chat(session, request));
        assertEquals(1, gateway.contexts.size());
        assertEquals(2, service.detail(session).messages().size());
        assertProblem(409, "REQUEST_ID_REUSED", () -> service.chat(session,
            new ChatbotDtos.Request(request.requestId(), "다른 내용", "TEXT")));
        assertProblem(409, "REQUEST_ID_REUSED", () -> service.chat(session,
            new ChatbotDtos.Request(request.requestId(), "안녕", "VOICE")));
    }

    @Test void failedApiCallDoesNotCommitHistoryOrConsumeRequestId() {
        var request = request("안녕");
        gateway.failure = new Problem(429, "GEMINI_RATE_LIMITED", "잠시 후 다시 시도해 주세요.", true);
        assertProblem(429, "GEMINI_RATE_LIMITED", () -> service.chat(session, request));
        assertTrue(service.detail(session).messages().isEmpty());
        gateway.failure = null;
        assertEquals(2, service.chat(session, request).historySize());
        assertEquals(2, gateway.contexts.size());
        assertTrue(gateway.contexts.get(1).history().isEmpty());
    }

    @Test void sessionsAreIsolatedAndResetDoesNotTouchOtherAppAttributes() {
        service.chat(session, request("가상 별명은 테스트하나"));
        MockHttpSession other = new MockHttpSession();
        assertTrue(service.detail(other).messages().isEmpty());
        service.chat(other, request("안녕"));
        assertTrue(gateway.contexts.get(1).history().isEmpty());
        session.setAttribute("other.app.value", "preserve");
        service.reset(session);
        assertFalse(session.isInvalid());
        assertEquals("preserve", session.getAttribute("other.app.value"));
        assertTrue(service.detail(session).messages().isEmpty());
        assertEquals(2, service.detail(other).messages().size());
    }

    @Test void boundsFullConversationAndOnlySendsRecentEightPairs() {
        var first = request("첫 인사");
        var original = service.chat(session, first);
        for (int i = 1; i < 40; i++) service.chat(session, request("인사 " + i));
        var latest = gateway.contexts.get(39);
        assertEquals(16, latest.history().size());
        assertEquals("인사 31", latest.history().get(0).text());
        assertEquals(80, service.detail(session).messages().size());
        assertProblem(409, "CONVERSATION_LIMIT", () -> service.chat(session, request("한 번 더")));
        assertEquals(original, service.chat(session, first));
        assertEquals(40, gateway.contexts.size());
    }

    @Test void missingKeyIsTruthfulAndDoesNotCallGateway() {
        gateway.configured = false;
        assertFalse(service.config().configured());
        assertFalse(service.config().liveVerified());
        assertNull(service.config().lastVerifiedAt());
        assertProblem(503, "GEMINI_NOT_CONFIGURED", () -> service.chat(session, request("안녕")));
        assertTrue(gateway.contexts.isEmpty());
        assertTrue(service.detail(session).messages().isEmpty());
    }

    @Test void policyAnswerShowsOnlyExactRegisteredExcerptNotInventedModelClaim() {
        gateway.reply = "모든 가족에게 매달 999만원을 지급합니다.";
        var response = service.chat(session, request("가족요양비는 누구나 받을 수 있나요?"));
        assertEquals("SUPPORTED", response.rag().status());
        assertEquals("gemini", response.provider());
        assertFalse(response.sources().isEmpty());
        assertFalse(response.reply().contains("999만원"));
        assertFalse(response.sources().get(0).text().contains("999만원"));
        Models.Knowledge cited = gateway.contexts.get(0).knowledge().get(0);
        assertTrue(cited.text().contains(response.sources().get(0).text()));
        assertEquals(cited.sourceUrl(), response.sources().get(0).sourceUrl());
    }

    @Test void fabricatedEvidenceAbstainsWithoutSourceCards() {
        gateway.answerOverride = new ChatbotDtos.Answer("확정 지급", List.of(new Models.Evidence("fake", "자료에 존재하지 않는 충분히 긴 조작 인용문입니다.")));
        var response = service.chat(session, request("가족요양비 알려줘"));
        assertEquals("UNGROUNDED", response.rag().status());
        assertTrue(response.sources().isEmpty());
        assertFalse(response.reply().contains("확정 지급"));
    }

    @Test void policySourceKeepsImportProvenanceWithoutInventingHumanReviewDate() {
        var response = service.chat(session, request("가족요양비 신청 서류 알려줘"));
        assertEquals("SUPPORTED", response.rag().status());
        Models.Source source = response.sources().get(0);
        assertEquals("POLICY", source.sourceKind());
        assertEquals(FAMILY_DOCUMENT.sourceUrl(), source.sourceUrl());
        assertEquals(FAMILY_DOCUMENT.fetchedAt().toString(), source.fetchedAt());
        assertEquals(FAMILY_DOCUMENT.sourceUpdatedAt(), source.sourceUpdatedAt());
        assertEquals("", source.reviewedAt());
    }

    @Test void retrievalFailureLeavesRequestRetryableWithoutCallingModelOrCommittingHistory() {
        boolean[] unavailable = {true};
        KnowledgeSearch search = query -> {
            if (unavailable[0]) throw new Problem(503, "RAG_STORE_UNAVAILABLE", "자료를 불러오지 못했습니다.", true);
            return knowledge.search(query);
        };
        ChatbotService isolated = new ChatbotService(gateway, search, CLOCK);
        var request = request("가족요양비 알려줘");
        assertProblem(503, "RAG_STORE_UNAVAILABLE", () -> isolated.chat(session, request));
        assertTrue(isolated.detail(session).messages().isEmpty());
        assertTrue(gateway.contexts.isEmpty());
        unavailable[0] = false;
        var response = isolated.chat(session, request);
        assertEquals("SUPPORTED", response.rag().status());
        assertEquals(2, response.historySize());
        assertEquals(1, gateway.contexts.size());
        assertTrue(gateway.contexts.get(0).history().isEmpty());
    }

    @Test void unsupportedLawQuestionDoesNotCallModelOrPretendToKnow() {
        String question = "프랑스 상속 소송 관할 법률 알려줘";
        assertTrue(knowledge.search(question).isEmpty());
        var response = service.chat(session, request(question));
        assertEquals("NO_MATCH", response.rag().status());
        assertEquals("retrieval", response.provider());
        assertTrue(response.sources().isEmpty());
        assertFalse(response.liveVerified());
        assertTrue(gateway.contexts.isEmpty());
    }

    @Test void immediatePolicyFollowupRetrievesOriginalTopicAndRegionDoesNotClaimEligibility() {
        service.chat(session, request("가족요양비는 누구나 받나요?"));
        var second = service.chat(session, request("그럼 신청 서류는?"));
        assertNotEquals("NOT_REQUESTED", second.rag().status());
        assertTrue(gateway.contexts.get(1).knowledge().stream().anyMatch(k -> k.id().startsWith(FAMILY_DOCUMENT.id() + ":")));
        var third = service.chat(session, request("서울 강남구요"));
        assertNotEquals("NOT_REQUESTED", third.rag().status());
        assertTrue(gateway.contexts.get(2).knowledge().stream().anyMatch(k -> k.id().startsWith(FAMILY_DOCUMENT.id() + ":")));
    }

    @Test void explicitHospitalQuestionAfterPolicySearchStartsANewHospitalQuery() {
        List<String> queries = new ArrayList<>();
        ChatbotService routed = new ChatbotService(gateway, sourceRoutedKnowledge(queries), CLOCK);
        String policy = "가족요양비 지원대상 알려줘";
        String hospital = "그럼 근처 병원은 어디야?";
        assertEquals("SUPPORTED", routed.chat(session, request(policy)).rag().status());

        var response = routed.chat(session, request(hospital));

        assertEquals(List.of(policy, hospital), queries);
        assertEquals("SUPPORTED", response.rag().status());
        assertEquals("HOSPITAL", response.sources().get(0).sourceKind());
        assertEquals(List.of("HOSPITAL"), gateway.contexts.get(1).knowledge().stream()
            .map(Models.Knowledge::category).distinct().toList());
        assertEquals(hospital, gateway.contexts.get(1).message());
        assertEquals(2, gateway.contexts.get(1).history().size());
        assertEquals(4, routed.detail(session).messages().size());
    }

    @Test void explicitPolicySwitchClearsHospitalTopicButKeepsPolicyFollowupsAndRegionFragments() {
        List<String> queries = new ArrayList<>();
        ChatbotService routed = new ChatbotService(gateway, sourceRoutedKnowledge(queries), CLOCK);
        String hospital = "근처 병원은 어디야?";
        String policy = "그럼 가족요양비 지원대상 조건은?";
        assertEquals("SUPPORTED", routed.chat(session, request(hospital)).rag().status());
        assertEquals("SUPPORTED", routed.chat(session, request(policy)).rag().status());
        var followup = routed.chat(session, request("그럼 신청 서류는?"));
        var region = routed.chat(session, request("서울 강남구요"));

        assertEquals(List.of(hospital, policy, policy + "\n후속 질문: 그럼 신청 서류는?",
            policy + "\n후속 질문: 서울 강남구요"), queries);
        assertEquals("SUPPORTED", followup.rag().status());
        assertEquals("SUPPORTED", region.rag().status());
        for (int i = 1; i < gateway.contexts.size(); i++) {
            assertEquals(List.of("POLICY"), gateway.contexts.get(i).knowledge().stream()
                .map(Models.Knowledge::category).distinct().toList());
        }
        assertEquals("POLICY", region.sources().get(0).sourceKind());
        assertEquals(8, routed.detail(session).messages().size());
    }

    @Test void empathyOptOutKeepsRealModelReplyAndClearsPolicyTopic() {
        service.chat(session, request("가족요양비 알려줘"));
        gateway.reply = "많이 지친 하루였겠어요. 어떤 일이 가장 힘들었나요?";
        var response = service.chat(session, request("정책 말고 그냥 이야기만 들어줘"));
        assertEquals(gateway.reply, response.reply());
        assertEquals("NOT_REQUESTED", response.rag().status());
        assertTrue(gateway.contexts.get(1).knowledge().isEmpty());
        assertTrue(response.sources().isEmpty());
        var next = service.chat(session, request("그건 얼마야?"));
        assertEquals("NOT_REQUESTED", next.rag().status());
        assertTrue(gateway.contexts.get(2).knowledge().isEmpty());
    }

    @Test void unrelatedFollowupDoesNotInheritPolicyTopic() {
        service.chat(session, request("가족요양비 알려줘"));
        var response = service.chat(session, request("그럼 내가 한 말 기억해?"));
        assertEquals("NOT_REQUESTED", response.rag().status());
        assertTrue(gateway.contexts.get(1).knowledge().isEmpty());
        assertEquals(2, gateway.contexts.get(1).history().size());
    }

    @Test void unsupportedCitationsInOrdinaryChatAndMalformedAnswerLeaveNoHistory() {
        gateway.answerOverride = new ChatbotDtos.Answer("안녕", List.of(new Models.Evidence("fake", "존재하지 않는 근거 문장입니다.")));
        assertProblem(502, "INVALID_MODEL_RESPONSE", () -> service.chat(session, request("안녕")));
        assertTrue(service.detail(session).messages().isEmpty());
        gateway.answerOverride = new ChatbotDtos.Answer(" ", List.of());
        assertProblem(502, "INVALID_MODEL_RESPONSE", () -> service.chat(session, request("안녕")));
        assertTrue(service.detail(session).messages().isEmpty());
    }

    @Test void invalidRequestCannotBypassServiceValidation() {
        assertProblem(400, "INVALID_REQUEST", () -> service.chat(session, null));
        assertProblem(400, "INVALID_REQUEST", () -> service.chat(session, new ChatbotDtos.Request("------------------------------------", "안녕", "TEXT")));
        assertProblem(400, "INVALID_REQUEST", () -> service.chat(session, request(" ")));
        assertProblem(400, "INVALID_REQUEST", () -> service.chat(session, request("가".repeat(2001))));
        assertProblem(400, "INVALID_REQUEST", () -> service.chat(session, new ChatbotDtos.Request(UUID.randomUUID().toString(), "안녕", "AUDIO")));
        assertTrue(gateway.contexts.isEmpty());
    }

    private static ChatbotDtos.Request request(String message) {
        return new ChatbotDtos.Request(UUID.randomUUID().toString(), message, "TEXT");
    }
    private static KnowledgeSearch sourceRoutedKnowledge(List<String> queries) {
        KnowledgeIndex policies = new KnowledgeIndex(List.of(FAMILY_DOCUMENT));
        KnowledgeIndex hospitals = new KnowledgeIndex(List.of(HOSPITAL_DOCUMENT));
        return query -> {
            queries.add(query);
            return ("HOSPITAL".equals(DatabaseKnowledgeSearch.sourceKind(query)) ? hospitals : policies).search(query);
        };
    }
    private static void assertProblem(int status, String code, org.junit.jupiter.api.function.Executable call) {
        Problem problem = assertThrows(Problem.class, call);
        assertEquals(status, problem.status());
        assertEquals(code, problem.code());
    }

    private static final class StubGateway implements ChatbotGateway {
        final List<ChatbotDtos.Context> contexts = new ArrayList<>();
        boolean configured = true;
        Problem failure;
        String reply;
        ChatbotDtos.Answer answerOverride;
        public ChatbotDtos.Answer generate(ChatbotDtos.Context context) {
            contexts.add(context);
            if (failure != null) throw failure;
            if (answerOverride != null) return answerOverride;
            List<Models.Evidence> evidence = context.knowledge().isEmpty() ? List.of()
                : List.of(new Models.Evidence(context.knowledge().get(0).id(), context.knowledge().get(0).text()));
            return new ChatbotDtos.Answer(reply == null ? "응답: " + context.message() : reply, evidence);
        }
        public String provider() { return "gemini"; }
        public String model() { return "test-stub"; }
        public boolean configured() { return configured; }
        public boolean liveVerified() { return false; }
        public String lastVerifiedAt() { return null; }
    }
}
