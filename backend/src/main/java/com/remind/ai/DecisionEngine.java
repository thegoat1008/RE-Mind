package com.remind.ai;

import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.util.Locale;
import java.util.Set;
import java.util.regex.Pattern;

/**
 * Conservative routing guardrails for the local MVP, not a clinical classifier.
 * A model may suggest an intent, but it cannot authorize writes or diagnoses.
 */
@Component
public class DecisionEngine {
    private static final Set<String> INTENTS = Set.of("EMPATHY", "POLICY", "SCHEDULE", "GENERAL", "CLARIFY");
    private static final Pattern DANGER = Pattern.compile(
            "죽고싶|죽을(?:거야|거예요)|살고싶지않|자살(?:을)?(?:할|하려|하겠|하고싶|생각이?있)|자해(?:를)?(?:할|하려|하겠|하고싶)|"
                    + "목숨을(?:끊|버리)|죽(?:일거|이겠|여버릴)|"
                    + "약을(?:한꺼번에|많이)먹었|숨을(?:못쉬|쉴수없)|의식이없|피가멈추지않");
    private static final Pattern NEGATED_DANGER = Pattern.compile(
            "죽고싶(?:지는|진|지)?않(?:아|아요|습니다|고)?|죽고싶은(?:건|것은)아니|"
                    + "(?:자살(?:을)?|자해(?:를)?)(?:하고싶은|하려는|할)?(?:생각|마음|계획)(?:은|이|도)?(?:전혀|절대)?없(?:어|어요|습니다|고)?|"
                    + "(?:자살(?:을)?|자해(?:를)?)(?:하고싶지않|하지않|안할)|살고싶지않은건아니");
    private static final Pattern POLICY_TOPIC = Pattern.compile(
            "정책|지원금|지원제도|지원사업|신청방법|장기요양|자조모임|가족교실|힐링프로그램|"
                    + "돌봄서비스|방문요양|주[·ㆍ]?야간보호|주간보호|복지혜택|치매안심센터|돌봄지원");
    private static final Pattern REQUEST = Pattern.compile(
            "알려|찾아|찾고|신청(?:방법|하려|하고싶|할)|받(?:을수|으려면|으려|는방법)|"
                    + "이용(?:방법|하려|할수)|어떻게|뭐|무엇|안내|추천|궁금|가능|"
                    + "있(?:나요|습니까|을까|을까요|는지|을지)|\\?");
    private static final Pattern ADD = Pattern.compile("등록|추가|넣어|넣을|적어|기록|잡아|만들어|저장");
    private static final Pattern NO_ADD = Pattern.compile("(?:등록|추가|기록|저장|만들|넣)(?:은|는|을|지|하|하지|하지는|하지는마|하지는말)?(?:하지마|하지말|지마|지말|안해|안할|말아|말고)|취소|삭제");

    public record Decision(String intent, String reason, boolean requiresConfirmation) {}

    public Decision decide(String message, String mode, String proposedIntent, boolean proposedSafety) {
        String text = normalize(message);
        if (hasCurrentDanger(text) || (proposedSafety && !onlyNegatedOrEducationalSafety(text))) {
            return new Decision("SAFETY", "현재의 위험 가능성을 먼저 확인합니다. 임상 진단을 뜻하지 않습니다.", false);
        }
        boolean explicitEmpathy = text.matches(".*(?:공감만|그냥.*(?:들어줘|들어주세요)|조언(?:하지마|하지말|은괜찮)|해결책(?:은괜찮|필요없)).*");
        boolean calendarContext = text.contains("일정") || text.contains("캘린더") || text.contains("달력");
        boolean dateContext = text.matches(".*(?:오늘|내일|모레|\\d{4}-\\d{1,2}-\\d{1,2}|\\d{1,2}월\\d{1,2}일|\\d{1,2}시).*" );
        boolean explicitSchedule = ADD.matcher(text).find() && !NO_ADD.matcher(text).find()
                && (calendarContext || (dateContext && text.matches(".*(?:넣어|적어|기록|등록|추가|저장).*")));
        boolean explicitPolicy = POLICY_TOPIC.matcher(text).find() && REQUEST.matcher(text).find()
                && !text.matches(".*(?:정책|지원금|지원제도)(?:은|는)?(?:필요없|말고|됐어|괜찮아).*" )
                && !text.matches(".*(?:정책|지원금|지원제도).*(?:알려주지마|검색하지마|찾지마).*" );

        if (explicitSchedule) {
            return new Decision("SCHEDULE", "명시적인 일정 기록 요청입니다. 초안만 만들며 저장에는 별도 확인이 필요합니다.", true);
        }
        if (explicitPolicy && !explicitEmpathy) {
            return new Decision("POLICY", "지원제도에 관한 명시적 질문입니다. 확인된 자료에서만 안내합니다.", false);
        }
        String suggested = proposedIntent == null ? "" : proposedIntent.toUpperCase(Locale.ROOT);
        if ("SCHEDULE".equals(suggested) && isTemporalFragment(text)) {
            return new Decision("SCHEDULE", "진행 중인 일정 초안의 날짜·시간 답변입니다. 저장은 수행하지 않습니다.", true);
        }
        if (explicitEmpathy || "EMPATHY".equalsIgnoreCase(mode)) {
            return new Decision("EMPATHY", "사용자가 선택한 공감 모드를 존중합니다.", false);
        }
        if (text.matches(".*(?:예약해줘|예약해주세요|예약잡아줘).*" ) && !calendarContext) {
            return new Decision("CLARIFY", "실제 기관 예약과 캘린더 기록을 구분해 확인해야 합니다.", false);
        }
        if ("SCHEDULE".equals(suggested)) {
            return new Decision("CLARIFY", "일정 기록 의도가 명확하지 않아 먼저 확인합니다.", false);
        }
        if ("POLICY".equals(suggested) && !POLICY_TOPIC.matcher(text).find()) {
            return new Decision("GENERAL", "정책 질문의 근거가 부족하므로 검색을 실행하지 않습니다.", false);
        }
        if (INTENTS.contains(suggested)) {
            return new Decision(suggested, "대화 맥락에 따른 보조 분류입니다. 의료 진단이나 실행 승인을 뜻하지 않습니다.", false);
        }
        return new Decision("GENERAL", "명확한 도구 요청이 없어 일반 대화를 이어갑니다.", false);
    }

    private boolean hasCurrentDanger(String text) {
        for (String clause : text.split("[.!?。！？]|하지만|그런데|그렇지만|그래도|\\n")) {
            String withoutNegations = NEGATED_DANGER.matcher(clause).replaceAll("");
            if (clause.matches(".*(?:뉴스|기사|소설|영화|인용|예시|교육자료).*")) {
                // Strip only the attributed quotation; danger stated outside it still takes priority.
                withoutNegations = withoutNegations.replaceAll("[\"“‘'][^\"”’']*[\"”’']", "");
            }
            // Educational phrases alone should not become an emergency because they contain a keyword.
            withoutNegations = withoutNegations.replaceAll("(?:자살|자해)예방(?:교육|방법|자료|수업|정책|안내)?", "");
            if (DANGER.matcher(withoutNegations).find()) return true;
        }
        return false;
    }

    private boolean onlyNegatedOrEducationalSafety(String text) {
        // A denial or education topic earlier in the message must not suppress a contextual warning.
        if (text.matches(".*(?:하지만|그런데|그렇지만|그래도|지금|이제).*")) return false;
        return !hasCurrentDanger(text) && (NEGATED_DANGER.matcher(text).find()
                || text.matches(".*(?:자살|자해)예방(?:교육|방법|자료|수업|정책|안내).*" )
                || text.matches(".*(?:뉴스|기사|소설|영화|인용|예시|교육자료).*?[\"“‘'][^\"”’']*[\"”’'].*"));
    }

    private boolean isTemporalFragment(String text) {
        String remainder = text.replaceAll("\\d{4}-\\d{1,2}-\\d{1,2}|(?:\\d{4}년)?\\d{1,2}월\\d{1,2}일", "")
                .replaceAll("(?:오전|오후|아침|저녁|밤|새벽|낮)?\\d{1,2}(?:시(?:\\d{1,2}분|반)?|:\\d{2})", "")
                .replaceAll("내일모레|오늘|내일|모레|정오|자정", "")
                .replaceAll("이에요|입니다|예요|이요|으로|로|에|요", "");
        return !text.isBlank() && remainder.isBlank();
    }

    private String normalize(String message) {
        return Normalizer.normalize(message == null ? "" : message, Normalizer.Form.NFKC)
                .toLowerCase(Locale.ROOT).replaceAll("\\s+", "");
    }
}
