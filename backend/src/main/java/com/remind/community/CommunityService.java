package com.remind.community;

import static com.remind.community.CommunityDtos.*;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class CommunityService {
    private final CommunityMemberRepository members;
    private final CommunityPostRepository posts;
    private final CommunityCommentRepository comments;
    private final CommunityReactionRepository reactions;
    private final SecureRandom random = new SecureRandom();

    CommunityService(CommunityMemberRepository members, CommunityPostRepository posts,
            CommunityCommentRepository comments, CommunityReactionRepository reactions) {
        this.members = members;
        this.posts = posts;
        this.comments = comments;
        this.reactions = reactions;
    }

    public Session createSession() {
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        String token = HexFormat.of().formatHex(bytes);
        String[] adjectives = {"따뜻한", "다정한", "차분한", "용감한", "포근한", "느긋한"};
        String[] animals = {"수달", "판다", "고양이", "토끼", "고슴도치", "펭귄"};
        String nickname = adjectives[random.nextInt(adjectives.length)] + " "
                + animals[random.nextInt(animals.length)] + " " + (1000 + random.nextInt(9000));
        members.save(new CommunityMember(hash(token), nickname));
        return new Session(token, nickname);
    }

    @Transactional(readOnly = true)
    public Viewer viewer(String authorization) {
        return new Viewer(member(authorization, true).nickname);
    }

    @Transactional(readOnly = true)
    public PageView<PostView> list(String authorization, String query, String mode, String order,
            boolean mine, int page, int size) {
        CommunityMember viewer = member(authorization, mine);
        validatePage(page, size);
        String search = query == null ? "" : query.strip();
        if (search.length() > 100) throw bad("검색어는 100자 이내로 입력해 주세요.");
        PostMode filter = mode == null || mode.equals("ALL") ? null : parseMode(mode);
        if (!Set.of("LATEST", "POPULAR").contains(order)) throw bad("정렬 기준을 확인해 주세요.");
        Specification<CommunityPost> spec = (root, criteria, cb) -> {
            var predicates = new ArrayList<jakarta.persistence.criteria.Predicate>();
            if (filter != null) predicates.add(cb.equal(root.get("mode"), filter));
            if (mine) predicates.add(cb.equal(root.get("author").get("id"), viewer.id));
            if (!search.isEmpty()) {
                String escaped = search.toLowerCase(Locale.ROOT).replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_");
                String pattern = "%" + escaped + "%";
                predicates.add(cb.or(cb.like(cb.lower(root.get("title")), pattern, '\\'),
                        cb.like(cb.lower(root.get("content")), pattern, '\\')));
            }
            return cb.and(predicates.toArray(jakarta.persistence.criteria.Predicate[]::new));
        };
        Sort sort = order.equals("POPULAR")
                ? Sort.by(Sort.Order.desc("likeCount"), Sort.Order.desc("createdAt"), Sort.Order.desc("id"))
                : Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id"));
        var result = posts.findAll(spec, PageRequest.of(page, size, sort));
        Set<Long> liked = new HashSet<>();
        if (viewer != null && !result.isEmpty()) {
            reactions.findByMemberIdAndPostIdIn(viewer.id, result.stream().map(p -> p.id).toList())
                    .stream().filter(r -> r.liked).forEach(r -> liked.add(r.post.getId()));
        }
        return new PageView<>(result.stream().map(p -> view(p, viewer, liked.contains(p.id))).toList(),
                page, result.getTotalPages(), result.getTotalElements(), result.hasNext());
    }

    public PostView createPost(String authorization, CreatePost request) {
        CommunityMember author = member(authorization, true);
        if (request == null) throw bad("글 내용을 입력해 주세요.");
        CommunityPost post = posts.save(new CommunityPost(author, parseMode(request.mode()),
                text(request.title(), "제목", 120), text(request.content(), "내용", 5000)));
        return view(post, author, false);
    }

    @Transactional(readOnly = true)
    public PostView detail(String authorization, Long id) {
        CommunityMember viewer = member(authorization, false);
        CommunityPost post = findPost(id, false);
        return view(post, viewer, liked(post, viewer));
    }

    public PostView editPost(String authorization, Long id, EditPost request) {
        CommunityMember author = member(authorization, true);
        CommunityPost post = findPost(id, true);
        owner(post.author, author);
        if (request == null) throw bad("글 내용을 입력해 주세요.");
        post.title = text(request.title(), "제목", 120);
        post.content = text(request.content(), "내용", 5000);
        post.updatedAt = Instant.now();
        return view(post, author, liked(post, author));
    }

    public void deletePost(String authorization, Long id) {
        CommunityMember author = member(authorization, true);
        CommunityPost post = findPost(id, true);
        owner(post.author, author);
        comments.deleteByPostId(id);
        reactions.deleteByPostId(id);
        posts.delete(post);
    }

    public PostView react(String authorization, Long id, boolean like, boolean view) {
        CommunityMember viewer = member(authorization, true);
        CommunityPost post = findPost(id, true);
        CommunityReaction reaction = reactions.findByPostIdAndMemberId(id, viewer.id)
                .orElseGet(() -> new CommunityReaction(post, viewer));
        if (view) {
            if (!reaction.viewed) { reaction.viewed = true; post.viewCount++; }
        } else if (reaction.liked != like) {
            reaction.liked = like;
            post.likeCount += like ? 1 : -1;
        }
        reactions.save(reaction);
        return view(post, viewer, reaction.liked);
    }

    @Transactional(readOnly = true)
    public PageView<CommentView> listComments(String authorization, Long id, int page, int size) {
        CommunityMember viewer = member(authorization, false);
        findPost(id, false);
        validatePage(page, size);
        var result = comments.findByPostId(id, PageRequest.of(page, size, Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id"))));
        return new PageView<>(result.stream().map(c -> commentView(c, viewer)).toList(), page,
                result.getTotalPages(), result.getTotalElements(), result.hasNext());
    }

    public CommentView addComment(String authorization, Long id, AddComment request) {
        CommunityMember author = member(authorization, true);
        CommunityPost post = findPost(id, true);
        if (post.mode == PostMode.EMPATHY) throw new ResponseStatusException(HttpStatus.CONFLICT, "공감 글에는 댓글 대신 하트로 마음을 전해 주세요.");
        if (request == null) throw bad("댓글을 입력해 주세요.");
        CommunityComment comment = comments.save(new CommunityComment(post, author, text(request.content(), "댓글", 1000)));
        post.commentCount++;
        return commentView(comment, author);
    }

    public void deleteComment(String authorization, Long postId, Long commentId) {
        CommunityMember author = member(authorization, true);
        CommunityPost post = findPost(postId, true);
        CommunityComment comment = comments.findById(commentId).filter(c -> c.post.getId().equals(postId))
                .orElseThrow(() -> missing("댓글을 찾을 수 없어요."));
        owner(comment.author, author);
        comments.delete(comment);
        post.commentCount--;
    }

    private CommunityMember member(String authorization, boolean required) {
        if (authorization == null && !required) return null;
        if (authorization == null || !authorization.matches("Bearer [0-9a-f]{64}")) throw unauthorized();
        return members.findByTokenHash(hash(authorization.substring(7))).orElseThrow(this::unauthorized);
    }

    private CommunityPost findPost(Long id, boolean lock) {
        if (id == null || id <= 0) throw missing("게시글을 찾을 수 없어요.");
        return (lock ? posts.lockById(id) : posts.findById(id)).orElseThrow(() -> missing("삭제되었거나 존재하지 않는 글이에요."));
    }

    private boolean liked(CommunityPost post, CommunityMember viewer) {
        return viewer != null && reactions.findByPostIdAndMemberId(post.id, viewer.id).map(r -> r.liked).orElse(false);
    }

    private PostView view(CommunityPost p, CommunityMember viewer, boolean liked) {
        return new PostView(p.id, p.mode.name(), p.title, p.content, p.author.getNickname(), p.createdAt,
                p.updatedAt, p.likeCount, p.commentCount, p.viewCount, liked, viewer != null && p.author.getId().equals(viewer.id));
    }

    private CommentView commentView(CommunityComment c, CommunityMember viewer) {
        return new CommentView(c.id, c.author.getNickname(), c.content, c.createdAt, viewer != null && c.author.getId().equals(viewer.id));
    }

    private void owner(CommunityMember expected, CommunityMember actual) {
        if (!expected.getId().equals(actual.id)) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "내가 작성한 글과 댓글만 변경할 수 있어요.");
    }

    private PostMode parseMode(String mode) {
        try { return PostMode.valueOf(mode == null ? "" : mode); }
        catch (IllegalArgumentException e) { throw bad("해결책 또는 공감 모드를 선택해 주세요."); }
    }

    private String text(String value, String label, int limit) {
        String trimmed = value == null ? "" : value.strip();
        if (trimmed.isBlank()) throw bad(label + "을 입력해 주세요.");
        if (trimmed.length() > limit) throw bad(label + "은 " + limit + "자 이내로 입력해 주세요.");
        return trimmed;
    }

    private void validatePage(int page, int size) {
        if (page < 0 || page > 10000 || size < 1 || size > 30) throw bad("페이지 범위를 확인해 주세요.");
    }

    private String hash(String token) {
        try { return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(token.getBytes(StandardCharsets.UTF_8))); }
        catch (NoSuchAlgorithmException e) { throw new IllegalStateException(e); }
    }

    private ResponseStatusException unauthorized() { return new ResponseStatusException(HttpStatus.UNAUTHORIZED, "참여 정보를 다시 확인해 주세요."); }
    private ResponseStatusException bad(String message) { return new ResponseStatusException(HttpStatus.BAD_REQUEST, message); }
    private ResponseStatusException missing(String message) { return new ResponseStatusException(HttpStatus.NOT_FOUND, message); }
}
