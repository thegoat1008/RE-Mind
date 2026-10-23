package com.remind.rag;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

/**
 * Extractive evidence boundary for policy and legal answers. A model selects excerpts;
 * it does not write the factual answer that crosses this boundary. Exact membership
 * establishes traceability to the registered summary corpus, not clinical/legal
 * correctness, relevance, or that a statement is entailed by an official web page.
 */
public final class RagEvidenceGate {
    private static final int MAX_SOURCES = 4;
    private static final int MIN_QUOTE_LENGTH = 20;
    private static final int MAX_QUOTE_LENGTH = 600;
    private static final String METHOD = "retrieval+exact-excerpt-check";
    private static final String SUPPORTED_REPLY =
        "등록된 자료에서 확인한 발췌를 아래에 보여드릴게요. 발췌는 DB에 등록된 공공자료와 대조한 내용이에요. 수집일은 사람의 검토일이나 현재 유효성 확인을 뜻하지 않아요. 개인별 자격·금액·법률 판단을 확정하는 답변은 아니므로, 적용 전 출처의 최신 안내를 확인해 주세요.";
    private static final String NO_MATCH_REPLY =
        "현재 등록된 자료에서 질문에 답할 근거를 찾지 못했어요. 관련 공식 자료를 추가하거나 해당 기관의 최신 안내를 확인해 주세요.";
    private static final String UNGROUNDED_REPLY =
        "관련 자료는 검색됐지만 답변을 뒷받침하는 발췌를 확인하지 못했어요. 현재 자료만으로는 이 질문에 답을 확정할 수 없어요. 공식 출처를 확인하거나 질문을 더 구체적으로 알려 주세요.";
    private static final String LISTEN_REPLY =
        "이야기를 들어드릴게요. 지금 가장 마음에 걸리는 일을 편하게 말씀해 주세요.";

    // Deliberately not the substring '법' or every '방법': everyday instructions and
    // calendar requests must not become legal/policy answers.
    private static final Pattern KNOWLEDGE = Pattern.compile(
        "정책|법률|법령|법적|지원(?:제도|금|사업|정책|대상|자격|조건|신청)|장기요양|등급|신청|상속|소송|급여|수급|본인부담|보조금|혜택|공단|가족요양|치매안심센터|보험(?:금|급여|적용|지원)|의료비|진료비|치료비|돌봄비|간병비|요양비|비용");
    private static final Pattern FACILITY = Pattern.compile("병원|의원|의료기관|치매안심센터");
    private static final Pattern LOCATION = Pattern.compile("찾|위치|어디|근처|주변|주소|전화|연락처|검색");
    private static final Pattern EVENT = Pattern.compile("행사|프로그램|가족교실|자조모임|모집");
    private static final Pattern INFORMATION = Pattern.compile("알려|찾|언제|어디|일정|모집|신청|참여|정보|소개|안내");
    private static final Pattern NEGATED_TOPIC = Pattern.compile(
        "(?:정책|법률|법령|지원제도|지원금|지원|장기요양|정보|조언|해결책|돈|비용)(?:은|는|이|가|을|를|에대한)?(?:얘기|이야기|설명|안내|추천)?(?:말고|말하지마|말하지말|알려주지마|알려주지말|설명하지마|설명하지말|추천하지마|추천하지말|찾지마|찾지말|필요없|원하지않)");
    private static final Pattern ONLY_LISTEN = Pattern.compile(
        "(?:얘기|이야기|말)만들어|공감만(?:해|받)|그냥들어(?:줘|주세요)");
    private static final Pattern CARE = Pattern.compile("치매|돌봄|돌보|간병|요양|엄마|아빠|어머니|아버지|할머니|할아버지|부모님|보호자");
    private static final Pattern PUBLIC_BODY = Pattern.compile("나라|국가|정부|지자체|시청|구청|보건소|공단");
    private static final Pattern MONEY_HELP = Pattern.compile("돈|경제|부담|도움|지원|받을|받는");
    private static final Pattern CARE_MONEY_HELP = Pattern.compile("경제적지원|금전적도움|경제적도움|지원받을돈|돈받을|돈을덜");

    public record Result(String reply, List<Models.Source> sources, Models.RagInfo rag) { }

    public static boolean requestsKnowledge(String question) {
        String normalized = normalize(question);
        if (ONLY_LISTEN.matcher(normalized).find()) return false;
        // Remove only the topic explicitly declined, so "정책 말고 법률 알려줘"
        // can still request another kind of registered knowledge.
        normalized = NEGATED_TOPIC.matcher(normalized).replaceAll("");
        return KNOWLEDGE.matcher(normalized).find()
            || (FACILITY.matcher(normalized).find() && LOCATION.matcher(normalized).find())
            || (EVENT.matcher(normalized).find() && INFORMATION.matcher(normalized).find())
            || (CARE.matcher(normalized).find()
                && ((PUBLIC_BODY.matcher(normalized).find() && MONEY_HELP.matcher(normalized).find())
                    || CARE_MONEY_HELP.matcher(normalized).find()));
    }

    public Result resolve(String question, List<Models.Knowledge> retrieved, Models.ModelPlan plan) {
        List<Models.Knowledge> docs = retrieved == null ? List.of() : retrieved;
        if (!requestsKnowledge(question)) {
            String normalizedQuestion = normalize(question);
            boolean informationDeclined = ONLY_LISTEN.matcher(normalizedQuestion).find()
                || NEGATED_TOPIC.matcher(normalizedQuestion).find();
            boolean citationsAttempted = plan != null
                && ((plan.sourceIds() != null && !plan.sourceIds().isEmpty())
                    || (plan.evidence() != null && !plan.evidence().isEmpty()));
            String reply = !informationDeclined && !citationsAttempted && plan != null && plan.reply() != null && !plan.reply().isBlank()
                ? plan.reply().strip() : LISTEN_REPLY;
            return new Result(reply, List.of(), new Models.RagInfo("NOT_REQUESTED", "", docs.size()));
        }
        if (docs.isEmpty()) return abstain("NO_MATCH", NO_MATCH_REPLY, 0);
        if (plan == null || plan.sourceIds() == null || plan.evidence() == null
                || plan.sourceIds().isEmpty() || plan.sourceIds().size() > MAX_SOURCES
                || plan.evidence().isEmpty() || plan.evidence().size() > MAX_SOURCES) {
            return abstain("UNGROUNDED", UNGROUNDED_REPLY, docs.size());
        }

        Map<String, Models.Knowledge> byId = new LinkedHashMap<>();
        for (Models.Knowledge doc : docs) {
            if (doc == null || doc.id() == null || doc.id().isBlank() || doc.text() == null
                    || byId.putIfAbsent(doc.id(), doc) != null) {
                return abstain("UNGROUNDED", UNGROUNDED_REPLY, docs.size());
            }
        }
        Set<String> sourceIds = new LinkedHashSet<>();
        for (String id : plan.sourceIds()) {
            if (id == null || !byId.containsKey(id) || !sourceIds.add(id)) {
                return abstain("UNGROUNDED", UNGROUNDED_REPLY, docs.size());
            }
        }
        Map<String, String> quotes = new LinkedHashMap<>();
        for (Models.Evidence evidence : plan.evidence()) {
            if (evidence == null || evidence.chunkId() == null || evidence.quote() == null) {
                return abstain("UNGROUNDED", UNGROUNDED_REPLY, docs.size());
            }
            Models.Knowledge doc = byId.get(evidence.chunkId());
            String quote = evidence.quote().strip();
            // Whitespace inside an excerpt, punctuation, and ellipses are never
            // normalized: the displayed excerpt must exist verbatim in the corpus.
            if (doc == null || quote.length() < MIN_QUOTE_LENGTH || quote.length() > MAX_QUOTE_LENGTH
                    || !doc.text().contains(quote) || quotes.putIfAbsent(evidence.chunkId(), quote) != null) {
                return abstain("UNGROUNDED", UNGROUNDED_REPLY, docs.size());
            }
        }
        if (!sourceIds.equals(quotes.keySet())) return abstain("UNGROUNDED", UNGROUNDED_REPLY, docs.size());

        List<Models.Source> sources = new ArrayList<>();
        for (String id : sourceIds) {
            Models.Knowledge doc = byId.get(id);
            sources.add(new Models.Source(id, doc.title(), quotes.get(id), doc.sourceUrl(), doc.reviewedAt(), doc.fetchedAt(), doc.sourceUpdatedAt(), doc.category()));
        }
        return new Result(SUPPORTED_REPLY, List.copyOf(sources), new Models.RagInfo("SUPPORTED", METHOD, docs.size()));
    }

    private static Result abstain(String status, String reply, int retrievedChunks) {
        return new Result(reply, List.of(), new Models.RagInfo(status, METHOD, retrievedChunks));
    }

    private static String normalize(String text) {
        return text == null ? "" : text.replaceAll("\\s+", "").toLowerCase(Locale.ROOT);
    }
}
