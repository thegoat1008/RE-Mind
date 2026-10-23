package com.remind.rag;

import jakarta.servlet.http.HttpSession;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Clock;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;

/** Session-scoped, bounded real conversation history. Nothing writes family records. */
public final class ChatbotService {
    private static final String STATE = ChatbotService.class.getName() + ".state";
    private static final int MAX_EXCHANGES = 40;
    private static final int CONTEXT_PAIRS = 8;
    private static final Pattern ONLY_LISTEN = Pattern.compile(
        "(?:얘기|이야기|말)만들어|공감만|그냥들어|(?:정책|법률|법령|지원제도|지원금|지원|장기요양|정보|조언|해결책|돈|비용)(?:은|는|이|가|을|를|에대한)?(?:얘기|이야기|설명|안내|추천)?(?:말고|말하지마|말하지말|알려주지마|알려주지말|설명하지마|설명하지말|추천하지마|추천하지말|찾지마|찾지말|필요없|원하지않)");
    private static final Pattern DEICTIC = Pattern.compile("^(?:그럼|그러면|그건|그거|그제도|그지원|그비용|그법|해당제도|해당지원|이경우|제경우|내경우|저의경우)");
    private static final Pattern POLICY_DETAIL = Pattern.compile("신청|대상|자격|조건|서류|금액|얼마|비용|기간|지역|등급|지원|절차|지급|받을|필요|준비|문의|기관|어디|어떻게|가능|해당");
    private static final Pattern SHORT_POLICY_DETAIL = Pattern.compile("^(?:신청|대상|자격|조건|서류|금액|얼마|비용|기간|지역|등급|지원금|절차|몇살|만[0-9])");
    private static final Pattern REGION_FRAGMENT = Pattern.compile("^(?:서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충청|충북|충남|전라|전북|전남|경상|경북|경남|제주)(?:특별시|광역시|특별자치시|특별자치도|도|시)?(?:[가-힣]{1,8}(?:시|군|구|동)){0,3}(?:요|입니다|살아요|거주해요|거주합니다|있어요|예요|이에요)?[.!?]*$");
    private static final String NOTICE = "Gemini API를 사용하는 챗봇입니다. 대화는 현재 브라우저 세션에 임시 보관되며 서버 재시작·세션 만료 시 사라집니다. 최대 40회 대화하고, 최근 8회 대화를 모델에 전달합니다. 실명·주소·진료기록 등 민감한 정보 대신 가상 예시로 시험해 주세요. 일정·돌봄 기록을 저장하는 기능은 없습니다.";

    private final ChatbotGateway gateway;
    private final KnowledgeSearch knowledge;
    private final Clock clock;
    private final RagEvidenceGate evidenceGate = new RagEvidenceGate();

    public ChatbotService(ChatbotGateway gateway, KnowledgeSearch knowledge, Clock clock) {
        this.gateway = gateway;
        this.knowledge = knowledge;
        this.clock = clock;
    }

    public ChatbotDtos.Config config() {
        return new ChatbotDtos.Config(gateway.provider(), gateway.model(), gateway.configured(),
            gateway.liveVerified(), gateway.lastVerifiedAt(), NOTICE);
    }

    public ChatbotDtos.Detail detail(HttpSession session) {
        synchronized (session) {
            State state = existing(session);
            return new ChatbotDtos.Detail(state == null ? List.of() : List.copyOf(state.messages));
        }
    }

    public ChatbotDtos.Response chat(HttpSession session, ChatbotDtos.Request request) {
        validate(request);
        String requestId = UUID.fromString(request.requestId()).toString();
        String fingerprint = fingerprint(request);
        synchronized (session) {
            State state = state(session);
            Cached cached = state.responses.get(requestId);
            if (cached != null) {
                if (!cached.fingerprint().equals(fingerprint))
                    throw new Problem(409, "REQUEST_ID_REUSED", "같은 요청 번호로 다른 내용을 보낼 수 없습니다. 새 요청으로 보내 주세요.", false);
                return cached.response();
            }
            if (state.responses.size() >= MAX_EXCHANGES)
                throw new Problem(409, "CONVERSATION_LIMIT", "현재 대화는 최대 40회까지 가능합니다. 필요한 내용을 확인한 뒤 새 대화를 시작해 주세요.", false);

            String message = request.message().strip();
            String query = knowledgeQuery(message, state.lastKnowledgeQuestion);
            List<Models.Knowledge> docs = query == null ? List.of() : knowledge.search(query);
            RagEvidenceGate.Result result;
            String provider;
            if (query != null && docs.isEmpty()) {
                result = evidenceGate.resolve(query, docs, null);
                provider = "retrieval";
            } else {
                if (!gateway.configured())
                    throw new Problem(503, "GEMINI_NOT_CONFIGURED", "Gemini API 키가 설정되지 않았습니다. 로컬 키 설정을 완료한 뒤 서버를 다시 실행해 주세요.", false);
                int start = Math.max(0, state.messages.size() - CONTEXT_PAIRS * 2);
                ChatbotDtos.Answer answer = gateway.generate(new ChatbotDtos.Context(message,
                    List.copyOf(state.messages.subList(start, state.messages.size())), docs,
                    LocalDate.now(clock).toString(), clock.getZone().getId()));
                validateAnswer(answer);
                if (query != null) {
                    List<String> ids = answer.evidence().stream().map(Models.Evidence::chunkId).toList();
                    result = evidenceGate.resolve(query, docs,
                        new Models.ModelPlan(answer.reply(), ids, answer.evidence()));
                } else {
                    // Opting out of information retains the model's empathetic reply.
                    // No source text was supplied, so unsupported citations are rejected.
                    if (!answer.evidence().isEmpty()) throw invalidAnswer();
                    result = new RagEvidenceGate.Result(answer.reply().strip(), List.of(),
                        new Models.RagInfo("NOT_REQUESTED", "", 0));
                }
                provider = gateway.provider();
            }
            ChatbotDtos.Response response = new ChatbotDtos.Response(requestId, result.reply(), result.sources(),
                result.rag(), provider, gateway.model(), gateway.liveVerified(), state.messages.size() + 2);
            // Commit both turns only after success. Failed calls remain retryable.
            state.messages.add(new ChatbotDtos.Turn("user", message));
            state.messages.add(new ChatbotDtos.Turn("assistant", response.reply()));
            state.responses.put(requestId, new Cached(fingerprint, response));
            state.lastKnowledgeQuestion = query == null ? null : query.split("\\n후속 질문: ", 2)[0];
            return response;
        }
    }

    public void reset(HttpSession session) {
        synchronized (session) { session.removeAttribute(STATE); }
    }

    private static String knowledgeQuery(String message, String previous) {
        String compact = message.replaceAll("\\s+", "").toLowerCase(Locale.ROOT);
        boolean explicitlyAsksKnowledge = RagEvidenceGate.requestsKnowledge(message);
        // "정책 말고 법률 알려줘" still asks another factual question.
        if (ONLY_LISTEN.matcher(compact).find() && !explicitlyAsksKnowledge) return null;
        // An explicit change of source kind starts a new search. Otherwise a leading
        // "그럼" could carry an earlier policy question into a hospital search.
        if (explicitlyAsksKnowledge && previous != null
            && !DatabaseKnowledgeSearch.sourceKind(message).equals(DatabaseKnowledgeSearch.sourceKind(previous)))
            return message;
        boolean followup = previous != null && compact.length() <= 120
            && ((DEICTIC.matcher(compact).find() && POLICY_DETAIL.matcher(compact).find()) || SHORT_POLICY_DETAIL.matcher(compact).find()
                || REGION_FRAGMENT.matcher(compact).matches());
        if (followup) return previous + "\n후속 질문: " + message;
        return explicitlyAsksKnowledge ? message : null;
    }

    private static void validate(ChatbotDtos.Request request) {
        if (request == null || request.requestId() == null ||
            !request.requestId().matches("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}") ||
            request.message() == null || request.message().isBlank() || request.message().length() > 2000 ||
            !("TEXT".equals(request.inputKind()) || "VOICE".equals(request.inputKind())))
            throw new Problem(400, "INVALID_REQUEST", "입력 형식과 필수 항목을 확인해 주세요.", false);
    }

    private static void validateAnswer(ChatbotDtos.Answer answer) {
        if (answer == null || answer.reply() == null || answer.reply().isBlank() || answer.reply().length() > 1200 ||
            answer.evidence() == null || answer.evidence().size() > 4 || answer.evidence().stream().anyMatch(e ->
                e == null || e.chunkId() == null || e.quote() == null)) throw invalidAnswer();
    }
    private static Problem invalidAnswer() {
        return new Problem(502, "INVALID_MODEL_RESPONSE", "AI 응답 형식을 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.", true);
    }
    private static String fingerprint(ChatbotDtos.Request request) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            digest.update(request.message().getBytes(StandardCharsets.UTF_8));
            digest.update((byte) 0);
            digest.update(request.inputKind().getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest.digest());
        } catch (NoSuchAlgorithmException impossible) { throw new IllegalStateException("SHA-256 is unavailable", impossible); }
    }
    private static State existing(HttpSession session) { return (State) session.getAttribute(STATE); }
    private static State state(HttpSession session) {
        State current = existing(session);
        if (current == null) { current = new State(); session.setAttribute(STATE, current); }
        return current;
    }
    private static final class State {
        final List<ChatbotDtos.Turn> messages = new ArrayList<>();
        final Map<String, Cached> responses = new LinkedHashMap<>();
        String lastKnowledgeQuestion;
    }
    private record Cached(String fingerprint, ChatbotDtos.Response response) { }
}
