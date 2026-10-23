package com.remind.community;

import java.util.List;
import java.util.Optional;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

interface CommunityMemberRepository extends JpaRepository<CommunityMember, Long> {
    Optional<CommunityMember> findByTokenHash(String tokenHash);
}

interface CommunityPostRepository extends JpaRepository<CommunityPost, Long>, JpaSpecificationExecutor<CommunityPost> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from CommunityPost p where p.id = :id")
    Optional<CommunityPost> lockById(Long id);
}

interface CommunityCommentRepository extends JpaRepository<CommunityComment, Long> {
    Page<CommunityComment> findByPostId(Long postId, Pageable pageable);
    void deleteByPostId(Long postId);
}

interface CommunityReactionRepository extends JpaRepository<CommunityReaction, Long> {
    Optional<CommunityReaction> findByPostIdAndMemberId(Long postId, Long memberId);
    List<CommunityReaction> findByMemberIdAndPostIdIn(Long memberId, List<Long> postIds);
    void deleteByPostId(Long postId);
}
