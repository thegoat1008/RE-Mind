package com.remind.rag;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Profile("rag")
public final class RagKnowledgeController {
    private final RagDocumentRepository repository;
    private final OriginPolicy origins;
    public RagKnowledgeController(RagDocumentRepository repository,OriginPolicy origins) {this.repository=repository;this.origins=origins;}
    @GetMapping("/api/chatbot/knowledge/status")
    public Map<String,Object> status(HttpServletRequest request) {
        origins.check(request);
        return Map.of("storage","shared-datasource","documents",repository.counts(),"retrieval","BM25+Korean-bigrams",
            "notice","수집일은 검토일이 아닙니다. 병원·행사는 복지 자격 근거로 사용하지 않습니다.");
    }
}
