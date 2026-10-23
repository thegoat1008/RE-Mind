package com.remind.ai;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
interface AiConversationRepository extends JpaRepository<AiConversation,String> {
    Optional<AiConversation> findByIdAndOwner(String id,String owner);
    List<AiConversation> findByOwnerOrderByUpdatedAtDesc(String owner);
    long countByOwner(String owner);
}
