package com.remind.community;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice(assignableTypes = CommunityController.class)
public class CommunityErrors {
    private static final Logger log = LoggerFactory.getLogger(CommunityErrors.class);
    @ExceptionHandler(ResponseStatusException.class)
    ResponseEntity<CommunityDtos.ApiError> status(ResponseStatusException error) {
        return ResponseEntity.status(error.getStatusCode()).body(new CommunityDtos.ApiError(error.getReason()));
    }
    @ExceptionHandler({HttpMessageNotReadableException.class, MethodArgumentTypeMismatchException.class})
    ResponseEntity<CommunityDtos.ApiError> invalid(Exception error) {
        return ResponseEntity.badRequest().body(new CommunityDtos.ApiError("입력 내용을 확인해 주세요."));
    }
    @ExceptionHandler(Exception.class)
    ResponseEntity<CommunityDtos.ApiError> unexpected(Exception error) {
        log.error("Community request failed", error);
        return ResponseEntity.internalServerError().body(new CommunityDtos.ApiError("처리하지 못했어요. 잠시 후 다시 시도해 주세요."));
    }
}
