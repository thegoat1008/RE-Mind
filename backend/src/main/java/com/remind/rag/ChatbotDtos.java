package com.remind.rag;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;

/** Chat-only types intentionally contain no calendar proposals or write actions. */
public final class ChatbotDtos {
    private ChatbotDtos() { }

    public record Request(
        @NotBlank @Pattern(regexp="[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}") String requestId,
        @NotBlank @Size(max=2000) String message,
        @NotBlank @Pattern(regexp="TEXT|VOICE") String inputKind) { }
    public record Turn(String role, String text) { }
    public record Context(String message, List<Turn> history, List<Models.Knowledge> knowledge,
                          String today, String timezone) { }
    public record Answer(String reply, List<Models.Evidence> evidence) { }
    public record Response(String requestId, String reply, List<Models.Source> sources,
                           Models.RagInfo rag, String provider, String model,
                           boolean liveVerified, int historySize) { }
    public record Config(String provider, String model, boolean configured,
                         boolean liveVerified, String lastVerifiedAt, String notice) { }
    public record Detail(List<Turn> messages) { }
}
