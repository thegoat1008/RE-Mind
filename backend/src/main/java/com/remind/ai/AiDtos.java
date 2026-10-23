package com.remind.ai;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;

/** HTTP contract; decisions are routing hints, never diagnoses or risk scores. */
public final class AiDtos {
    private AiDtos() {}
    public record ChatRequest(
        @Pattern(regexp="[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}") String conversationId,
        @NotBlank @Pattern(regexp="[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}") String requestId,
        @NotBlank @Pattern(regexp="EMPATHY|SOLUTION") String mode,
        @NotBlank @Size(max=2000) String message,
        @Size(max=50) String region) {}
    public record ChatResponse(String conversationId, String requestId, String reply,
        DecisionEngine.Decision decision, List<PolicyCatalog.Policy> sources,
        ScheduleParser.Proposal scheduleProposal, String provider, boolean demo, Safety safety) {}
    public record Safety(String message) {}
    public record Config(String provider, boolean demo, boolean configured, String notice) {}
    public record Summary(String id, String mode, String title, String updatedAt) {}
    public record Turn(String role, String content) {}
    public record Detail(String id, String mode, List<Turn> messages, List<ChatResponse> exchanges) {}
    public record Error(String code, String message, boolean retryable) {}
}
