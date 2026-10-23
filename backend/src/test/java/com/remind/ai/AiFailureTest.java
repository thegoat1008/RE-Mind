package com.remind.ai;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.json.JsonMapper;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest @AutoConfigureMockMvc @ActiveProfiles("oni")
class AiFailureTest {
    @Autowired MockMvc mvc;
    @MockitoBean AiGateway gateway;
    final JsonMapper json=JsonMapper.builder().build();
    @BeforeEach void setup(){when(gateway.provider()).thenReturn("gemini");when(gateway.configured()).thenReturn(true);}
    String body(String message){return json.writeValueAsString(Map.of("requestId",UUID.randomUUID().toString(),"mode","SOLUTION","message",message));}
    @Test void externalFailureDoesNotBecomeDemoSuccessOrPersist() throws Exception {
        when(gateway.plan(anyString(),anyString(),anyList())).thenThrow(AiProblem.unavailable());
        MockHttpSession session=new MockHttpSession();
        mvc.perform(post("/api/ai/chat").session(session).contentType("application/json").content(body("어떤 도움이 있나요?")))
            .andExpect(status().isServiceUnavailable()).andExpect(jsonPath("$.code").value("AI_UNAVAILABLE"));
        mvc.perform(get("/api/ai/conversations").session(session)).andExpect(jsonPath("$.length()").value(0));
        verify(gateway,never()).answer(any());
    }
    @Test void serverRejectsInventedSourcesEvenIfGatewayReturnsThem() throws Exception {
        when(gateway.plan(anyString(),anyString(),anyList())).thenReturn(new AiGateway.Plan("POLICY",false,"방문요양"));
        when(gateway.answer(any())).thenReturn(new AiGateway.Answer("확인되지 않은 안내",List.of("invented")));
        MockHttpSession session=new MockHttpSession();
        mvc.perform(post("/api/ai/chat").session(session).contentType("application/json").content(body("방문요양 지원제도 알려줘")))
            .andExpect(status().isBadGateway()).andExpect(jsonPath("$.code").value("AI_INVALID_RESPONSE"));
        mvc.perform(get("/api/ai/conversations").session(session)).andExpect(jsonPath("$.length()").value(0));
    }
    @Test void modelCannotTurnBareTimeIntoNewScheduleWithoutPriorDraft() throws Exception {
        when(gateway.plan(anyString(),anyString(),anyList())).thenReturn(new AiGateway.Plan("SCHEDULE",false,""));
        when(gateway.answer(any())).thenReturn(new AiGateway.Answer("앱에 기록할 일정을 말씀하시는 건가요?",List.of()));
        mvc.perform(post("/api/ai/chat").session(new MockHttpSession()).contentType("application/json").content(body("오후 3시")))
            .andExpect(status().isOk()).andExpect(jsonPath("$.decision.intent").value("CLARIFY"))
            .andExpect(jsonPath("$.scheduleProposal").doesNotExist());
    }
    @Test void missingKeyIsVisibleInConfig() throws Exception {
        when(gateway.configured()).thenReturn(false);
        mvc.perform(get("/api/ai/config")).andExpect(jsonPath("$.configured").value(false)).andExpect(jsonPath("$.demo").value(false));
    }
    @Test void localSafetyResponseBypassesExternalModel() throws Exception {
        mvc.perform(post("/api/ai/chat").session(new MockHttpSession()).contentType("application/json").content(body("지금 죽고 싶어요")))
            .andExpect(status().isOk()).andExpect(jsonPath("$.provider").value("safety-rules"));
        verify(gateway,never()).plan(anyString(),anyString(),anyList());verify(gateway,never()).answer(any());
    }
}
