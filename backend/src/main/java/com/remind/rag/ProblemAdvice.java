package com.remind.rag;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.converter.HttpMessageNotReadableException;

@org.springframework.context.annotation.Profile("rag")
@RestControllerAdvice(basePackageClasses=ChatbotController.class)
public class ProblemAdvice {
    @ExceptionHandler(Problem.class)
    ResponseEntity<Models.Error> problem(Problem problem) {
        return ResponseEntity.status(problem.status())
            .body(new Models.Error(problem.code(), problem.getMessage(), problem.retryable()));
    }
    @ExceptionHandler({MethodArgumentNotValidException.class, HttpMessageNotReadableException.class})
    ResponseEntity<Models.Error> invalid(Exception ignored) {
        return ResponseEntity.badRequest().body(new Models.Error("INVALID_REQUEST", "입력 형식과 필수 항목을 확인해 주세요.", false));
    }
}
