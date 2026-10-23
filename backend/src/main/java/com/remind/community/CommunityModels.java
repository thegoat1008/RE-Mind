package com.remind.community;

import java.time.Instant;
import jakarta.persistence.*;

enum PostMode { SOLUTION, EMPATHY }

@Entity
@Table(name = "community_members")
class CommunityMember {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false, unique = true, length = 64)
    String tokenHash;
    @Column(nullable = false, length = 40)
    String nickname;
    protected CommunityMember() {}
    CommunityMember(String tokenHash, String nickname) {
        this.tokenHash = tokenHash;
        this.nickname = nickname;
    }
    public Long getId() { return id; }
    public String getNickname() { return nickname; }
}

@Entity
@Table(name = "community_posts", indexes = @Index(name = "idx_community_posts_created", columnList = "createdAt"))
class CommunityPost {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    CommunityMember author;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 16)
    PostMode mode;
    @Column(nullable = false, length = 120)
    String title;
    @Column(nullable = false, length = 5000)
    String content;
    @Column(nullable = false)
    Instant createdAt;
    @Column(nullable = false)
    Instant updatedAt;
    long likeCount;
    long commentCount;
    long viewCount;
    protected CommunityPost() {}
    CommunityPost(CommunityMember author, PostMode mode, String title, String content) {
        this.author = author;
        this.mode = mode;
        this.title = title;
        this.content = content;
        this.createdAt = this.updatedAt = Instant.now();
    }
    public Long getId() { return id; }
}

@Entity
@Table(name = "community_comments", indexes = @Index(name = "idx_community_comments_post", columnList = "post_id"))
class CommunityComment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    CommunityPost post;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    CommunityMember author;
    @Column(nullable = false, length = 1000)
    String content;
    @Column(nullable = false)
    Instant createdAt;
    protected CommunityComment() {}
    CommunityComment(CommunityPost post, CommunityMember author, String content) {
        this.post = post;
        this.author = author;
        this.content = content;
        this.createdAt = Instant.now();
    }
}

@Entity
@Table(name = "community_reactions", uniqueConstraints = @UniqueConstraint(columnNames = {"post_id", "member_id"}))
class CommunityReaction {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    CommunityPost post;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    CommunityMember member;
    boolean liked;
    boolean viewed;
    protected CommunityReaction() {}
    CommunityReaction(CommunityPost post, CommunityMember member) {
        this.post = post;
        this.member = member;
    }
}
