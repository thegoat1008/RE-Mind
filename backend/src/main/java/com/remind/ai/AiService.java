package com.remind.ai;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.List;
import java.util.Objects;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.databind.json.JsonMapper;

@Service
public class AiService {
    public static final String NOTICE="로컬 MVP예요. 가상 상황으로 테스트해 주세요. 온이는 의료 진단이나 전문 상담을 대신하지 않아요.";
    private final AiGateway ai;
    private final DecisionEngine decisions;
    private final PolicyCatalog policies;
    private final ScheduleParser schedules;
    private final AiConversationRepository conversations;
    private final AiExchangeRepository exchanges;
    private final JsonMapper json=JsonMapper.builder().build();
    public AiService(AiGateway ai, DecisionEngine decisions, PolicyCatalog policies, ScheduleParser schedules,
                     AiConversationRepository conversations,AiExchangeRepository exchanges) {
        this.ai=ai;this.decisions=decisions;this.policies=policies;this.schedules=schedules;
        this.conversations=conversations;this.exchanges=exchanges;
    }
    public AiDtos.Config config() { return new AiDtos.Config(ai.provider(),ai.provider().equals("demo"),ai.configured(),NOTICE); }

    /** Controller serializes a browser session: duplicate retries cannot create duplicate turns. */
    @Transactional
    public AiDtos.ChatResponse send(String owner,AiDtos.ChatRequest request) {
        String message=request.message().strip();
        if(message.isBlank()) throw new AiProblem(400,"INVALID_INPUT","메시지를 입력해 주세요.",false);
        String fingerprint=fingerprint(request);
        AiConversation conversation=request.conversationId()==null
            ? null : owned(owner,request.conversationId());
        AiExchange cached=exchanges.findByOwnerAndRequestId(owner,request.requestId()).orElse(null);
        if(cached!=null) {
            if(!cached.fingerprint.equals(fingerprint)) throw new AiProblem(409,"REQUEST_CONFLICT","같은 요청 번호로 다른 내용을 보낼 수 없어요.",false);
            return decode(cached);
        }
        if(conversation!=null&&!conversation.mode.equals(request.mode()))
            throw new AiProblem(409,"MODE_CONFLICT","대화 중에는 모드를 바꿀 수 없어요. 새 대화를 시작해 주세요.",false);
        if(conversation==null) {
            if(conversations.countByOwner(owner)>=20) throw new AiProblem(429,"CONVERSATION_LIMIT","시연 대화 한도에 도달했어요. 이전 대화를 삭제해 주세요.",false);
            conversation=new AiConversation(owner,request.mode(),message);
        }
        List<AiExchange> previous=exchanges.findByConversationIdOrderByIdAsc(conversation.id);
        if(previous.size()>=80) throw new AiProblem(429,"TURN_LIMIT","이 대화의 시연 한도에 도달했어요. 새 대화를 시작해 주세요.",false);
        List<AiDtos.Turn> history=new ArrayList<>();
        for(AiExchange e:previous.subList(Math.max(0,previous.size()-5),previous.size())) {
            history.add(new AiDtos.Turn("USER",e.userText));
            history.add(new AiDtos.Turn("ASSISTANT",decode(e).reply()));
        }
        DecisionEngine.Decision preliminary=decisions.decide(message,request.mode(),"GENERAL",false);
        AiGateway.Plan plan;
        if(preliminary.intent().equals("SAFETY")) plan=new AiGateway.Plan("GENERAL",true,"");
        else plan=ai.plan(message,request.mode(),List.copyOf(history));
        ScheduleParser.Proposal last=previous.isEmpty()?null:decode(previous.get(previous.size()-1)).scheduleProposal();
        boolean continuation=last!=null&&!preliminary.intent().equals("SCHEDULE")&&message.strip().matches("(?:오늘|내일|모레|오전|오후|아침|저녁|밤|새벽|낮|정오|자정|[0-9]).{0,50}");
        String proposed=continuation?"SCHEDULE":plan.intent();
        if(!continuation&&!preliminary.intent().equals("SCHEDULE")&&proposed.equals("SCHEDULE")) proposed="CLARIFY";
        DecisionEngine.Decision decision=decisions.decide(message,request.mode(),proposed,plan.safety());
        List<PolicyCatalog.Policy> found=decision.intent().equals("POLICY")
            ? policies.search(message+" "+plan.policyQuery(),request.region()):List.of();
        ScheduleParser.Proposal proposal=decision.intent().equals("SCHEDULE")?schedules.parse(message):null;
        if(proposal!=null&&continuation) proposal=mergeDraft(last,proposal);
        AiDtos.Safety safety=decision.intent().equals("SAFETY")
            ? new AiDtos.Safety("지금 안전한 곳에 계신가요? 현재 위험이 있다면 대화보다 주변 사람과 응급 도움을 먼저 연결해 주세요. 이 표시는 진단 결과가 아니에요."):null;
        AiGateway.Context context=new AiGateway.Context(message,request.mode(),List.copyOf(history),decision,found,proposal);
        AiGateway.Answer answer=safety!=null?new DemoGateway().answer(context):ai.answer(context);
        List<String> allowed=found.stream().map(PolicyCatalog.Policy::id).toList();
        if(answer.text()==null||answer.text().isBlank()||answer.sourceIds()==null||!allowed.containsAll(answer.sourceIds())
            ||(decision.intent().equals("POLICY")&&!allowed.isEmpty()&&answer.sourceIds().isEmpty()))
            throw new AiProblem(502,"AI_INVALID_RESPONSE","AI 답변의 근거를 확인하지 못했어요. 다시 시도해 주세요.",true);
        List<PolicyCatalog.Policy> sources=found.stream().filter(p->answer.sourceIds().contains(p.id())).toList();
        AiDtos.ChatResponse response=new AiDtos.ChatResponse(conversation.id,request.requestId(),answer.text(),decision,
            sources,proposal,safety!=null?"safety-rules":ai.provider(),ai.provider().equals("demo"),safety);
        conversation.updatedAt=Instant.now();
        conversations.save(conversation);
        exchanges.save(new AiExchange(owner,conversation.id,request.requestId(),fingerprint,message,json.writeValueAsString(response)));
        return response;
    }
    @Transactional(readOnly=true)
    public List<AiDtos.Summary> list(String owner) {
        return conversations.findByOwnerOrderByUpdatedAtDesc(owner).stream()
            .map(c->new AiDtos.Summary(c.id,c.mode,c.title,c.updatedAt.toString())).toList();
    }
    @Transactional(readOnly=true)
    public AiDtos.Detail detail(String owner,String id) {
        AiConversation c=owned(owner,id);
        List<AiDtos.Turn> turns=new ArrayList<>();
        List<AiDtos.ChatResponse> responses=new ArrayList<>();
        for(AiExchange exchange:exchanges.findByConversationIdOrderByIdAsc(id)) {
            AiDtos.ChatResponse response=decode(exchange); responses.add(response);
            turns.add(new AiDtos.Turn("USER",exchange.userText)); turns.add(new AiDtos.Turn("ASSISTANT",response.reply()));
        }
        return new AiDtos.Detail(c.id,c.mode,List.copyOf(turns),List.copyOf(responses));
    }
    @Transactional public void delete(String owner,String id) {
        AiConversation c=owned(owner,id); exchanges.deleteByConversationId(id);conversations.delete(c);
    }
    private AiConversation owned(String owner,String id) {
        return conversations.findByIdAndOwner(id,owner).orElseThrow(()->new AiProblem(404,"CONVERSATION_NOT_FOUND","이 브라우저에서 볼 수 있는 대화가 없어요. 새 대화를 시작해 주세요.",false));
    }
    private AiDtos.ChatResponse decode(AiExchange exchange) { return json.readValue(exchange.responseJson,AiDtos.ChatResponse.class); }
    private String fingerprint(AiDtos.ChatRequest request) {
        try { return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256")
            .digest(json.writeValueAsString(request).getBytes(StandardCharsets.UTF_8))); }
        catch(Exception e) { throw new IllegalStateException("Request fingerprint unavailable"); }
    }
    private ScheduleParser.Proposal mergeDraft(ScheduleParser.Proposal old,ScheduleParser.Proposal fresh) {
        String title=Objects.requireNonNullElse(fresh.title(),Objects.requireNonNullElse(old.title(),""));
        String date=fresh.missingFields().contains("invalidDate")?null:fresh.date()!=null?fresh.date():old.date();
        String time=fresh.missingFields().contains("invalidTime")?null:fresh.time()!=null?fresh.time():old.time();
        List<String> missing=new ArrayList<>();
        if(title.isBlank()) missing.add("title"); if(date==null) missing.add("date");if(time==null) missing.add("time");
        ZoneId zone=ZoneId.of("Asia/Seoul");
        if(date!=null&&(LocalDate.parse(date).isBefore(LocalDate.now(zone))||
            (time!=null&&LocalDateTime.of(LocalDate.parse(date),LocalTime.parse(time)).isBefore(LocalDateTime.now(zone))))) missing.add("futureDateTime");
        return new ScheduleParser.Proposal(title.isBlank()?null:title,date,time,zone.getId(),List.copyOf(missing),false);
    }
}
