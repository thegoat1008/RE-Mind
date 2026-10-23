package com.remind.ai;

import jakarta.persistence.*;

@Entity
@Table(name="oni_exchange",uniqueConstraints=@UniqueConstraint(columnNames={"owner","request_id"}))
class AiExchange {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
    @Column(nullable=false) String owner;
    @Column(name="conversation_id",nullable=false) String conversationId;
    @Column(name="request_id",nullable=false) String requestId;
    @Column(nullable=false,length=64) String fingerprint;
    @Column(nullable=false,length=2000) String userText;
    @Lob @Column(nullable=false) String responseJson;
    protected AiExchange() {}
    AiExchange(String owner,String conversationId,String requestId,String fingerprint,String userText,String responseJson) {
        this.owner=owner; this.conversationId=conversationId; this.requestId=requestId; this.fingerprint=fingerprint;
        this.userText=userText; this.responseJson=responseJson;
    }
}
