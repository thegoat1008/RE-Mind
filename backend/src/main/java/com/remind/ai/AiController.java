package com.remind.ai;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.UUID;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/** Anonymous sandbox only. Integrate authenticated principal before enabling on production. */
@RestController
@Profile("oni")
@RequestMapping("/api/ai")
public class AiController {
    private final AiService service;
    public AiController(AiService service) { this.service=service; }
    @GetMapping("/config") public AiDtos.Config config() { return service.config(); }
    @GetMapping("/conversations") public List<AiDtos.Summary> list(HttpSession session) { synchronized(session) { return service.list(owner(session)); } }
    @GetMapping("/conversations/{id}") public AiDtos.Detail detail(@PathVariable String id,HttpSession session) {
        synchronized(session) { return service.detail(owner(session),id); }
    }
    @DeleteMapping("/conversations/{id}") public ResponseEntity<Void> delete(@PathVariable String id,HttpServletRequest request) {
        checkOrigin(request);HttpSession session=request.getSession();
        synchronized(session) { service.delete(owner(session),id);return ResponseEntity.noContent().build(); }
    }
    @PostMapping("/chat") public AiDtos.ChatResponse chat(@Valid @RequestBody AiDtos.ChatRequest body,HttpServletRequest request) {
        checkOrigin(request);HttpSession session=request.getSession();
        synchronized(session) {
            rateLimit(session);
            return service.send(owner(session),body);
        }
    }
    private String owner(HttpSession session) {
        String owner=(String)session.getAttribute("oni.owner");
        if(owner==null) { owner=UUID.randomUUID().toString();session.setAttribute("oni.owner",owner); }
        return owner;
    }
    private void rateLimit(HttpSession session) {
        long now=System.currentTimeMillis();
        long[] window=(long[])session.getAttribute("oni.rate");
        if(window==null||now-window[0]>=60_000) {window=new long[]{now,0};session.setAttribute("oni.rate",window);}
        if(++window[1]>12) throw new AiProblem(429,"TOO_MANY_REQUESTS","요청이 많아요. 1분 뒤 다시 시도해 주세요.",true);
    }
    private void checkOrigin(HttpServletRequest request) {
        String origin=request.getHeader("Origin");
        if(origin==null) return;
        try {
            URI uri=URI.create(origin);
            if((uri.getScheme().equals("http")||uri.getScheme().equals("https"))&&
                ("localhost".equals(uri.getHost())||"127.0.0.1".equals(uri.getHost())||"[::1]".equals(uri.getHost()))) return;
        } catch(RuntimeException ignored) { }
        throw new AiProblem(403,"ORIGIN_NOT_ALLOWED","로컬 시연 화면에서 요청해 주세요.",false);
    }
}
