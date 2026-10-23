package com.remind.rag;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.time.Clock;
import java.util.ArrayDeque;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@org.springframework.context.annotation.Profile("rag")
@RequestMapping("/api/chatbot")
public class ChatbotController {
    private static final String RATE = ChatbotController.class.getName() + ".rate";
    private final ChatbotService service;
    private final Clock clock;
    private final OriginPolicy origins;

    public ChatbotController(ChatbotService service, @org.springframework.beans.factory.annotation.Qualifier("ragClock") Clock clock, OriginPolicy origins) { this.service = service; this.clock = clock; this.origins=origins; }

    @GetMapping("/config")
    public ChatbotDtos.Config config(HttpServletRequest request) {
        origins.check(request);
        return service.config();
    }
    @GetMapping("/conversation")
    public ChatbotDtos.Detail detail(HttpServletRequest request) {
        origins.check(request);
        return service.detail(request.getSession());
    }
    @PostMapping("/chat")
    public ChatbotDtos.Response chat(HttpServletRequest request, @Valid @RequestBody ChatbotDtos.Request body) {
        origins.check(request);
        HttpSession session = request.getSession();
        synchronized (session) { rateLimit(session); return service.chat(session, body); }
    }
    @DeleteMapping("/conversation")
    public ResponseEntity<Void> reset(HttpServletRequest request) {
        origins.check(request);
        HttpSession session = request.getSession(false);
        if (session != null) service.reset(session);
        return ResponseEntity.noContent().build();
    }

    @SuppressWarnings("unchecked")
    private void rateLimit(HttpSession session) {
        ArrayDeque<Long> timestamps = (ArrayDeque<Long>) session.getAttribute(RATE);
        if (timestamps == null) { timestamps = new ArrayDeque<>(); session.setAttribute(RATE, timestamps); }
        long now = clock.millis();
        while (!timestamps.isEmpty() && timestamps.peekFirst() <= now - 60_000) timestamps.removeFirst();
        if (timestamps.size() >= 12)
            throw new Problem(429, "RATE_LIMITED", "요청이 많습니다. 잠시 후 다시 시도해 주세요.", true);
        timestamps.addLast(now);
    }
    private static Problem denied() {
        return new Problem(403, "ORIGIN_DENIED", "로컬 앱 화면에서 요청해 주세요.", false);
    }
}
