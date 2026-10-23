package com.remind.ai;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;

class DecisionEngineTest {
    private final DecisionEngine engine = new DecisionEngine();

    @Test void empathyModeDoesNotLaunchSuggestedPolicySearch() {
        assertEquals("EMPATHY", engine.decide("어머니를 돌보느라 지쳐요", "EMPATHY", "POLICY", false).intent());
    }

    @Test void explicitPolicyQuestionOverridesEmpathyMode() {
        assertEquals("POLICY", engine.decide("힘들어요. 방문요양 신청 방법을 알려줘", "EMPATHY", null, false).intent());
    }

    @Test void narrativeAboutBenefitsDoesNotOverrideEmpathyMode() {
        assertEquals("EMPATHY", engine.decide("지원금을 못 받아서 속상해요", "EMPATHY", "POLICY", false).intent());
        assertEquals("EMPATHY", engine.decide("장기요양을 이용하고 있어서 조금 안심돼요", "EMPATHY", "POLICY", false).intent());
    }

    @Test void justListenOverridesIncidentalPolicyTopic() {
        assertEquals("EMPATHY", engine.decide("지원금 받을지 모르겠지만 그냥 내 이야기 들어줘", "SOLUTION", "POLICY", false).intent());
    }

    @ParameterizedTest
    @ValueSource(strings = {"지금 죽고 싶어요", "자해할 생각이 있어요", "자해를 하고 싶어요", "자살을 할 생각이 있어요", "지금 숨을 못 쉬어요", "약을 한꺼번에 먹었어요"})
    void currentDangerTakesPriority(String text) {
        assertEquals("SAFETY", engine.decide(text, "EMPATHY", "EMPATHY", false).intent());
    }

    @ParameterizedTest
    @ValueSource(strings = {"죽고 싶지 않아요", "자살할 생각은 없어요", "자살할 생각이 전혀 없어요", "자해하고 싶은 마음은 없어요", "자해 예방교육 자료를 알려줘", "돌봄 때문에 너무 슬퍼요"})
    void sadnessNegationsAndEducationAreNotAutomaticallyCrisis(String text) {
        assertNotEquals("SAFETY", engine.decide(text, "SOLUTION", "GENERAL", false).intent());
    }

    @Test void knownEducationalContextRejectsModelFalsePositive() {
        assertNotEquals("SAFETY", engine.decide("자살 예방교육 방법을 알고 싶어요", "SOLUTION", "GENERAL", true).intent());
    }

    @Test void negationInAnotherClauseDoesNotHideCurrentDanger() {
        assertEquals("SAFETY", engine.decide("어제는 자살할 생각이 없었어. 하지만 지금 죽고 싶어요", "EMPATHY", null, false).intent());
    }

    @Test void contextualModelSafetyCanEscalateWithoutKeyword() {
        assertEquals("SAFETY", engine.decide("지금 위험한 상황에 있어요", "EMPATHY", "GENERAL", true).intent());
    }

    @Test void earlierDenialCannotSuppressContextualModelWarning() {
        assertEquals("SAFETY", engine.decide("자살할 생각은 없었어. 하지만 지금 위험한 곳에 있어", "EMPATHY", "GENERAL", true).intent());
    }

    @Test void attributedMediaQuoteDoesNotBecomeCurrentDanger() {
        assertNotEquals("SAFETY", engine.decide("뉴스에서 ‘죽고 싶어요’라는 표현을 봤어요", "SOLUTION", "GENERAL", false).intent());
        assertNotEquals("SAFETY", engine.decide("뉴스에서 ‘죽고 싶어요’라는 표현을 봤어요", "SOLUTION", "GENERAL", true).intent());
        assertEquals("SAFETY", engine.decide("뉴스에서 ‘죽고 싶어요’라는 표현을 봤어요. 지금 나도 죽고 싶어요", "SOLUTION", "GENERAL", false).intent());
    }

    @Test void scheduleRequiresAnExplicitRecordRequest() {
        DecisionEngine.Decision result = engine.decide("내일 오후 3시 병원 일정을 등록해줘", "EMPATHY", null, false);
        assertEquals("SCHEDULE", result.intent());
        assertTrue(result.requiresConfirmation());
        assertEquals("CLARIFY", engine.decide("내일 병원에 갈까", "SOLUTION", "SCHEDULE", false).intent());
        assertEquals("SCHEDULE", engine.decide("내일 오후 3시\n병원 일정을 등록해줘", "SOLUTION", null, false).intent());
    }

    @Test void actualHospitalBookingCannotBecomeCalendarCreation() {
        assertEquals("CLARIFY", engine.decide("병원 예약해줘", "SOLUTION", "SCHEDULE", false).intent());
    }

    @Test void explicitDoNotRegisterCannotBecomeSchedule() {
        assertNotEquals("SCHEDULE", engine.decide("내일 오후 3시 일정을 등록하지 마", "SOLUTION", "GENERAL", false).intent());
    }

    @Test void temporalReplyCanContinueAnExistingDraft() {
        assertEquals("SCHEDULE", engine.decide("오후 3시예요", "SOLUTION", "SCHEDULE", false).intent());
    }

    @Test void modelCannotInventPolicyIntentFromUnrelatedMessage() {
        assertEquals("GENERAL", engine.decide("오늘 날씨가 좋아요", "SOLUTION", "POLICY", false).intent());
    }
}
