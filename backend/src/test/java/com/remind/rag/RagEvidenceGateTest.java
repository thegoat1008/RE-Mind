package com.remind.rag;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import static org.assertj.core.api.Assertions.*;

class RagEvidenceGateTest {
    private final RagEvidenceGate gate = new RagEvidenceGate();
    private final String quote = "가족이 돌본다는 사실만으로 누구나 지급받는다는 뜻이 아닙니다.";
    private final Models.Knowledge doc = new Models.Knowledge("family-benefit#1", "가족요양비 요약", "LAW",
        "가족요양비에는 별도 요건이 있습니다. " + quote + " 적용 조건은 현행 안내에서 확인해야 합니다.",
        "https://www.law.go.kr/example", "2026-10-24", List.of("가족요양비"));

    @Test void publishesOnlyExactRegisteredSummaryExcerptAndDiscardsModelClaims() {
        var result = gate.resolve("가족요양비를 받을 수 있나요?", List.of(doc), plan("무조건 100만원 지급됩니다.",
            List.of(doc.id()), List.of(new Models.Evidence(doc.id(), "  " + quote + "  "))));
        assertThat(result.rag().status()).isEqualTo("SUPPORTED");
        assertThat(result.rag().retrievedChunks()).isEqualTo(1);
        assertThat(result.reply()).isNotBlank().doesNotContain("100만원", "정확도", "100%");
        assertThat(result.sources()).singleElement().satisfies(source -> {
            assertThat(source.text()).isEqualTo(quote);
            assertThat(source.id()).isEqualTo(doc.id());
            assertThat(source.sourceUrl()).isEqualTo(doc.sourceUrl());
        });
    }

    @Test void noMatchingCorpusDoesNotUseTheModelsOutsideKnowledge() {
        var result = gate.resolve("상속 소송에서 이길 수 있나요?", List.of(),
            plan("승소할 수 있습니다.", List.of(), List.of()));
        assertThat(result.rag().status()).isEqualTo("NO_MATCH");
        assertThat(result.reply()).contains("근거를 찾지 못했").doesNotContain("승소");
        assertThat(result.sources()).isEmpty();
    }

    @Test void carriesImportedPublicMetadataWithoutPromotingFetchTimeToHumanReview() {
        Models.Knowledge imported = new Models.Knowledge(doc.id(), doc.title(), "POLICY", doc.text(),
            "https://www.data.go.kr/data/15072392/openapi.do", "", List.of(),
            "2026-10-24T00:00:00Z", "2026-10-23");
        var result = gate.resolve("가족요양비를 받을 수 있나요?", List.of(imported),
            plan("모두 지원됩니다.", List.of(imported.id()), List.of(new Models.Evidence(imported.id(), quote))));
        assertThat(result.rag().status()).isEqualTo("SUPPORTED");
        assertThat(result.sources()).singleElement().satisfies(source -> {
            assertThat(source.reviewedAt()).isEmpty();
            assertThat(source.fetchedAt()).isEqualTo(imported.fetchedAt());
            assertThat(source.sourceUpdatedAt()).isEqualTo(imported.sourceUpdatedAt());
            assertThat(source.sourceKind()).isEqualTo("POLICY");
        });
        assertThat(result.reply()).doesNotContain("모두 지원됩니다");
    }

    @Test void matchingDocumentsAloneAreNotEvidenceForAnAnswer() {
        assertUngrounded(plan("가족요양비를 모두 받습니다.", List.of(doc.id()), List.of()));
        assertUngrounded(plan("가족요양비를 모두 받습니다.", List.of(), List.of(new Models.Evidence(doc.id(), quote))));
        assertUngrounded(plan("가족요양비를 모두 받습니다.", List.of(), List.of()));
    }

    @Test void fabricatedOrEditedQuotationAbstains() {
        assertUngrounded(plan("확정", List.of(doc.id()), List.of(new Models.Evidence(doc.id(), "모든 가족에게 별도 조건 없이 현금이 지급됩니다."))));
        assertUngrounded(plan("확정", List.of(doc.id()), List.of(new Models.Evidence(doc.id(), quote.replace(" ", "  ")))));
        assertUngrounded(plan("확정", List.of(doc.id()), List.of(new Models.Evidence(doc.id(), "가족이 돌본다는 사실만으로… 지급받는다는 뜻이 아닙니다."))));
    }

    @Test void aSingleBadCitationAbstainsFromTheWholeAnswer() {
        assertUngrounded(plan("확정", List.of(doc.id(), "not-retrieved#1"),
            List.of(new Models.Evidence(doc.id(), quote), new Models.Evidence("not-retrieved#1", quote))));
        assertUngrounded(plan("확정", List.of(doc.id()), List.of(new Models.Evidence("other#1", quote))));
    }

    @Test void duplicateAndUnboundedEvidenceAreRejected() {
        assertUngrounded(plan("확정", List.of(doc.id(), doc.id()), List.of(new Models.Evidence(doc.id(), quote))));
        assertUngrounded(plan("확정", List.of(doc.id()),
            List.of(new Models.Evidence(doc.id(), quote), new Models.Evidence(doc.id(), quote))));
        assertUngrounded(plan("확정", List.of(doc.id()), List.of(new Models.Evidence(doc.id(), "별도 요건"))));
        assertUngrounded(plan("확정", List.of(doc.id()), List.of(new Models.Evidence(doc.id(), "가".repeat(601)))));
    }

    @Test void evidenceFromAnotherRetrievedChunkCannotBeAttachedToThisSource() {
        Models.Knowledge second = new Models.Knowledge("other#2", "다른 요약", "POLICY",
            "이 자료는 다른 지원 절차의 개요를 설명하며 개인별 지원금액을 판단하지 않습니다.",
            "https://www.nhis.or.kr/example", "2026-10-24", List.of());
        var result = gate.resolve("지원금을 알려줘", List.of(doc, second),
            plan("확정", List.of(doc.id()), List.of(new Models.Evidence(doc.id(), second.text()))));
        assertThat(result.rag().status()).isEqualTo("UNGROUNDED");
        assertThat(result.sources()).isEmpty();
    }

    @Test void ordinaryConversationKeepsItsReplyAndDoesNotAcquireSourceCards() {
        var result = gate.resolve("오늘은 지쳐요", List.of(), plan("많이 지치셨겠어요.", List.of(), List.of()));
        assertThat(result.rag().status()).isEqualTo("NOT_REQUESTED");
        assertThat(result.reply()).isEqualTo("많이 지치셨겠어요.");
        assertThat(result.sources()).isEmpty();
    }

    @Test void explicitOptOutCannotBeOverriddenByTheModelsPolicyPlan() {
        var result = gate.resolve("비용 때문에 힘든데 정책 말고 이야기만 들어줘", List.of(doc),
            plan("정부가 모든 비용을 지원합니다.", List.of(doc.id()), List.of(new Models.Evidence(doc.id(), quote))));
        assertThat(result.rag().status()).isEqualTo("NOT_REQUESTED");
        assertThat(result.reply()).contains("이야기를 들어").doesNotContain("모든 비용");
        assertThat(result.sources()).isEmpty();
    }

    @Test void unexpectedCitationsInAnEverydayAnswerDoNotLeakFactualModelClaims() {
        var result = gate.resolve("산책 기록해줘", List.of(doc),
            plan("산책하면 모든 병이 낫습니다.", List.of(doc.id()), List.of(new Models.Evidence(doc.id(), quote))));
        assertThat(result.rag().status()).isEqualTo("NOT_REQUESTED");
        assertThat(result.reply()).doesNotContain("병이 낫");
        assertThat(result.sources()).isEmpty();
    }

    @Test void anUncitedPolicyReplyCannotOverrideExplicitOptOutEither() {
        var result = gate.resolve("정책은 알려주지 말고 공감만 해줘", List.of(),
            plan("정부가 모든 비용을 지원합니다.", List.of(), List.of()));
        assertThat(result.rag().status()).isEqualTo("NOT_REQUESTED");
        assertThat(result.reply()).contains("이야기를 들어").doesNotContain("모든 비용");
        assertThat(result.sources()).isEmpty();
    }

    @Test void malformedEvidenceFailsClosedRatherThanThrowing() {
        assertUngrounded(new Models.ModelPlan("답변", List.of(doc.id()), null));
        assertUngrounded(plan("답변", List.of(doc.id()), java.util.Arrays.asList((Models.Evidence) null)));
        assertUngrounded(plan("답변", List.of(doc.id()), List.of(new Models.Evidence(doc.id(), null))));
    }

    @ParameterizedTest
    @ValueSource(strings = {"정책 알려줘", "법률이 궁금해", "법적 책임이 있나요", "장기요양 신청은 어떻게 해", "돌봄 비용이 부담돼", "상속 소송 상담", "할머니 돌보는데 나라에서 받을 돈이 있나", "엄마 돌보는데 나라에서 돈 받을 수 있나요", "부모님 간병하면서 경제적 도움 받을 곳", "정책 말고 법률 알려줘"})
    void recognizesExplicitPolicyLegalAndMoneyQuestions(String question) {
        assertThat(RagEvidenceGate.requestsKnowledge(question)).isTrue();
    }

    @ParameterizedTest
    @ValueSource(strings = {"할머니 산책 기록해줘", "내일 오후 세 시 병원 일정 등록", "기록하는 방법 알려줘", "목소리를 입력하는 방법", "오늘 너무 지쳐요", "정책 말고 이야기만 들어줘", "정책은 알려주지 말고 공감만 해줘", "지원금 필요없어 얘기만 들어줘"})
    void doesNotTreatEverydayMethodsOrDeclinedInformationAsLegalAdvice(String question) {
        assertThat(RagEvidenceGate.requestsKnowledge(question)).isFalse();
    }

    private Models.ModelPlan plan(String reply, List<String> ids, List<Models.Evidence> evidence) {
        return new Models.ModelPlan(reply, ids, evidence);
    }

    private void assertUngrounded(Models.ModelPlan plan) {
        var result = gate.resolve("가족요양비를 받을 수 있나요?", List.of(doc), plan);
        assertThat(result.rag().status()).isEqualTo("UNGROUNDED");
        assertThat(result.sources()).isEmpty();
        assertThat(result.reply()).contains("발췌를 확인하지 못했");
    }
}
