package com.remind.community;

import java.time.Instant;
import java.util.List;

public final class CommunityDtos {
    private CommunityDtos() {}
    public record Session(String token, String nickname) {}
    public record Viewer(String nickname) {}
    public record CreatePost(String mode, String title, String content) {}
    public record EditPost(String title, String content) {}
    public record AddComment(String content) {}
    public record PostView(Long id, String mode, String title, String content,
            String nickname, Instant createdAt, Instant updatedAt, long likeCount,
            long commentCount, long viewCount, boolean liked, boolean mine) {}
    public record CommentView(Long id, String nickname, String content, Instant createdAt, boolean mine) {}
    public record PageView<T>(List<T> items, int page, int totalPages, long totalElements, boolean hasNext) {}
    public record ApiError(String message) {}
}
