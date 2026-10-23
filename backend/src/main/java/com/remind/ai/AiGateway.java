package com.remind.ai;

import java.util.List;

/** Bounded two-step agent: plan -> allowlisted Java tools -> answer. */
public interface AiGateway {
    record Plan(String intent, boolean safety, String policyQuery) {}
    record Context(String message, String mode, List<AiDtos.Turn> history,
                   DecisionEngine.Decision decision, List<PolicyCatalog.Policy> policies,
                   ScheduleParser.Proposal schedule) {}
    record Answer(String text, List<String> sourceIds) {}
    Plan plan(String message, String mode, List<AiDtos.Turn> history);
    Answer answer(Context context);
    String provider();
    boolean configured();
}
