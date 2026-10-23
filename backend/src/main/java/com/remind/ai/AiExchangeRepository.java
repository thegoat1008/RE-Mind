package com.remind.ai;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
interface AiExchangeRepository extends JpaRepository<AiExchange,Long> {
    Optional<AiExchange> findByOwnerAndRequestId(String owner,String requestId);
    List<AiExchange> findByConversationIdOrderByIdAsc(String conversationId);
    long countByConversationId(String conversationId);
    void deleteByConversationId(String conversationId);
}
