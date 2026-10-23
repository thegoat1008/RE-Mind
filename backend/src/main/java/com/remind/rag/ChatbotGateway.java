package com.remind.rag;

/** Text conversation only. This interface exposes no calendar, save, or family actions. */
public interface ChatbotGateway {
    ChatbotDtos.Answer generate(ChatbotDtos.Context context);
    String provider();
    String model();
    boolean configured();
    boolean liveVerified();
    String lastVerifiedAt();
}
