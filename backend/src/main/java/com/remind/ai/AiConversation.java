package com.remind.ai;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name="oni_conversation")
class AiConversation {
    @Id String id;
    @Column(nullable=false) String owner;
    @Column(nullable=false) String mode;
    @Column(nullable=false,length=60) String title;
    @Column(nullable=false) Instant updatedAt;
    protected AiConversation() {}
    AiConversation(String owner,String mode,String message) {
        this.id=UUID.randomUUID().toString(); this.owner=owner; this.mode=mode;
        this.title=message.substring(0,Math.min(40,message.length())); this.updatedAt=Instant.now();
    }
}
