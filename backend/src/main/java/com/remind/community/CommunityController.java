package com.remind.community;

import static com.remind.community.CommunityDtos.*;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/community")
@ConditionalOnProperty(name = "community.enabled", havingValue = "true")
public class CommunityController {
    private final CommunityService service;
    CommunityController(CommunityService service) { this.service = service; }

    @PostMapping("/session") @ResponseStatus(HttpStatus.CREATED)
    Session createSession() { return service.createSession(); }
    @GetMapping("/session")
    Viewer viewer(@RequestHeader(value = "Authorization", required = false) String auth) { return service.viewer(auth); }

    @GetMapping("/posts")
    PageView<PostView> list(@RequestHeader(value = "Authorization", required = false) String auth,
            @RequestParam(defaultValue = "") String q, @RequestParam(defaultValue = "ALL") String mode,
            @RequestParam(defaultValue = "LATEST") String sort, @RequestParam(defaultValue = "false") boolean mine,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return service.list(auth, q, mode, sort, mine, page, size);
    }
    @PostMapping("/posts") @ResponseStatus(HttpStatus.CREATED)
    PostView create(@RequestHeader(value = "Authorization", required = false) String auth, @RequestBody CreatePost body) {
        return service.createPost(auth, body);
    }
    @GetMapping("/posts/{id}")
    PostView detail(@RequestHeader(value = "Authorization", required = false) String auth, @PathVariable Long id) { return service.detail(auth, id); }
    @PutMapping("/posts/{id}")
    PostView edit(@RequestHeader(value = "Authorization", required = false) String auth, @PathVariable Long id, @RequestBody EditPost body) { return service.editPost(auth, id, body); }
    @DeleteMapping("/posts/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@RequestHeader(value = "Authorization", required = false) String auth, @PathVariable Long id) { service.deletePost(auth, id); }
    @PutMapping("/posts/{id}/like")
    PostView like(@RequestHeader(value = "Authorization", required = false) String auth, @PathVariable Long id) { return service.react(auth, id, true, false); }
    @DeleteMapping("/posts/{id}/like")
    PostView unlike(@RequestHeader(value = "Authorization", required = false) String auth, @PathVariable Long id) { return service.react(auth, id, false, false); }
    @PutMapping("/posts/{id}/view")
    PostView viewed(@RequestHeader(value = "Authorization", required = false) String auth, @PathVariable Long id) { return service.react(auth, id, false, true); }
    @GetMapping("/posts/{id}/comments")
    PageView<CommentView> comments(@RequestHeader(value = "Authorization", required = false) String auth, @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) { return service.listComments(auth, id, page, size); }
    @PostMapping("/posts/{id}/comments") @ResponseStatus(HttpStatus.CREATED)
    CommentView addComment(@RequestHeader(value = "Authorization", required = false) String auth, @PathVariable Long id, @RequestBody AddComment body) { return service.addComment(auth, id, body); }
    @DeleteMapping("/posts/{id}/comments/{commentId}") @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteComment(@RequestHeader(value = "Authorization", required = false) String auth, @PathVariable Long id, @PathVariable Long commentId) { service.deleteComment(auth, id, commentId); }
}
