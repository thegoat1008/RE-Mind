package com.remind.ai;

import java.util.Map;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;
import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(properties="oni.ai.provider=demo")
@AutoConfigureMockMvc
@ActiveProfiles("oni")
class AiApiTest {
    @Autowired MockMvc mvc;
    final JsonMapper json=JsonMapper.builder().build();
    Map<String,Object> request(String message,String mode) {
        return Map.of("requestId",UUID.randomUUID().toString(),"message",message,"mode",mode);
    }
    JsonNode send(MockHttpSession session,Map<String,Object> body) throws Exception {
        return json.readTree(mvc.perform(post("/api/ai/chat").session(session).contentType("application/json")
            .content(json.writeValueAsString(body))).andExpect(status().isOk()).andReturn().getResponse().getContentAsString());
    }
    @Test void demoConfigIsExplicit() throws Exception {
        mvc.perform(get("/api/ai/config")).andExpect(status().isOk())
            .andExpect(jsonPath("$.demo").value(true)).andExpect(jsonPath("$.provider").value("demo"));
    }
    @Test void empathyAndHistoryRoundTrip() throws Exception {
        MockHttpSession session=new MockHttpSession();
        JsonNode response=send(session,request("그냥 제 이야기를 들어주세요","EMPATHY"));
        assertThat(response.path("decision").path("intent").asString()).isEqualTo("EMPATHY");
        mvc.perform(get("/api/ai/conversations/"+response.path("conversationId").asString()).session(session))
            .andExpect(status().isOk()).andExpect(jsonPath("$.messages.length()").value(2))
            .andExpect(jsonPath("$.exchanges[0].demo").value(true));
    }
    @Test void policySourcesAreServerControlled() throws Exception {
        JsonNode response=send(new MockHttpSession(),request("방문요양 지원제도를 알려주세요","SOLUTION"));
        assertThat(response.path("decision").path("intent").asString()).isEqualTo("POLICY");
        assertThat(response.path("sources").size()).isGreaterThan(0);
        assertThat(response.path("sources").get(0).path("sourceUrl").asString()).startsWith("https://www.");
    }
    @Test void unknownMoneyPolicyHasNoInventedSources() throws Exception {
        JsonNode response=send(new MockHttpSession(),request("치매 보호자에게 주는 우주인 지원금 알려줘","SOLUTION"));
        assertThat(response.path("sources").size()).isZero();
    }
    @Test void sessionsCannotReadOrDeleteEachOthersConversation() throws Exception {
        String id=send(new MockHttpSession(),request("마음이 지쳐요","EMPATHY")).path("conversationId").asString();
        MockHttpSession stranger=new MockHttpSession();
        mvc.perform(get("/api/ai/conversations/"+id).session(stranger)).andExpect(status().isNotFound());
        mvc.perform(delete("/api/ai/conversations/"+id).session(stranger)).andExpect(status().isNotFound());
        mvc.perform(get("/api/ai/conversations").session(stranger)).andExpect(jsonPath("$.length()").value(0));
    }
    @Test void firstRequestRetryDoesNotDuplicateConversationOrMessages() throws Exception {
        MockHttpSession session=new MockHttpSession(); Map<String,Object> body=request("너무 지쳐요","EMPATHY");
        JsonNode a=send(session,body),b=send(session,body);
        assertThat(b).isEqualTo(a);
        mvc.perform(get("/api/ai/conversations").session(session)).andExpect(jsonPath("$.length()").value(1));
        mvc.perform(get("/api/ai/conversations/"+a.path("conversationId").asString()).session(session))
            .andExpect(jsonPath("$.messages.length()").value(2));
    }
    @Test void changedPayloadWithSameRequestIdIsConflict() throws Exception {
        MockHttpSession session=new MockHttpSession(); Map<String,Object> body=request("지쳐요","EMPATHY");send(session,body);
        mvc.perform(post("/api/ai/chat").session(session).contentType("application/json").content(json.writeValueAsString(
            Map.of("requestId",body.get("requestId"),"message","다른 내용","mode","EMPATHY"))))
            .andExpect(status().isConflict()).andExpect(jsonPath("$.code").value("REQUEST_CONFLICT"));
    }
    @Test void existingModeCannotBeSilentlyChanged() throws Exception {
        MockHttpSession session=new MockHttpSession();String id=send(session,request("지쳐요","EMPATHY")).path("conversationId").asString();
        mvc.perform(post("/api/ai/chat").session(session).contentType("application/json").content(json.writeValueAsString(
            Map.of("conversationId",id,"requestId",UUID.randomUUID().toString(),"message","안녕","mode","SOLUTION"))))
            .andExpect(status().isConflict()).andExpect(jsonPath("$.code").value("MODE_CONFLICT"));
    }
    @Test void incompleteScheduleCanBeCompletedButNeverSaved() throws Exception {
        MockHttpSession session=new MockHttpSession();
        JsonNode first=send(session,request("내일 병원 일정을 추가해줘","SOLUTION"));
        assertThat(first.path("scheduleProposal").path("missingFields").toString()).contains("time");
        JsonNode second=send(session,Map.of("conversationId",first.path("conversationId").asString(),
            "requestId",UUID.randomUUID().toString(),"message","오후 3시","mode","SOLUTION"));
        assertThat(second.path("scheduleProposal").path("time").asString()).isEqualTo("15:00");
        assertThat(second.path("scheduleProposal").path("date").asString()).isEqualTo(first.path("scheduleProposal").path("date").asString());
        assertThat(second.path("scheduleProposal").path("saved").asBoolean()).isFalse();
        assertThat(second.path("scheduleProposal").path("missingFields").size()).isZero();
    }
    @Test void newScheduleDoesNotInheritPreviousSchedulesTime() throws Exception {
        MockHttpSession session=new MockHttpSession();
        JsonNode first=send(session,request("내일 오후 3시 병원 일정을 추가해줘","SOLUTION"));
        JsonNode second=send(session,Map.of("conversationId",first.path("conversationId").asString(),
            "requestId",UUID.randomUUID().toString(),"message","내일 산책 일정을 추가해줘","mode","SOLUTION"));
        assertThat(second.path("scheduleProposal").path("title").asString()).isEqualTo("산책");
        assertThat(second.path("scheduleProposal").path("time").isNull()).isTrue();
        assertThat(second.path("scheduleProposal").path("missingFields").toString()).contains("time");
    }
    @Test void invalidCorrectionCannotSilentlyReuseOldTime() throws Exception {
        MockHttpSession session=new MockHttpSession();
        JsonNode first=send(session,request("내일 오후 3시 병원 일정을 추가해줘","SOLUTION"));
        JsonNode second=send(session,Map.of("conversationId",first.path("conversationId").asString(),
            "requestId",UUID.randomUUID().toString(),"message","오후 25시","mode","SOLUTION"));
        assertThat(second.path("scheduleProposal").path("time").isNull()).isTrue();
        assertThat(second.path("scheduleProposal").path("missingFields").toString()).contains("time");
    }
    @Test void safetyIsNotDiagnosisAndDoesNotRequireModel() throws Exception {
        JsonNode response=send(new MockHttpSession(),request("지금 죽고 싶어요","EMPATHY"));
        assertThat(response.path("decision").path("intent").asString()).isEqualTo("SAFETY");
        assertThat(response.path("safety").path("message").asString()).contains("진단 결과가 아니");
        assertThat(response.path("provider").asString()).isEqualTo("safety-rules");
    }
    @Test void rejectsBlankOrOverlongMessages() throws Exception {
        for(String text:new String[]{"   ","a".repeat(2001)}) {
            mvc.perform(post("/api/ai/chat").contentType("application/json").content(json.writeValueAsString(request(text,"EMPATHY"))))
                .andExpect(status().isBadRequest());
        }
    }
    @Test void rejectsCrossSiteWrite() throws Exception {
        mvc.perform(post("/api/ai/chat").header("Origin","https://example.com").contentType("application/json")
            .content(json.writeValueAsString(request("안녕","EMPATHY"))))
            .andExpect(status().isForbidden());
    }
    @Test void deleteRemovesDetailAndExchange() throws Exception {
        MockHttpSession session=new MockHttpSession();String id=send(session,request("지쳐요","EMPATHY")).path("conversationId").asString();
        mvc.perform(delete("/api/ai/conversations/"+id).session(session)).andExpect(status().isNoContent());
        mvc.perform(get("/api/ai/conversations/"+id).session(session)).andExpect(status().isNotFound());
    }
}
