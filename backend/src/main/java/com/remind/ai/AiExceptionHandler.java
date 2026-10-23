package com.remind.ai;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(assignableTypes=AiController.class)
public class AiExceptionHandler {
    @ExceptionHandler(AiProblem.class)
    public ResponseEntity<AiDtos.Error> known(AiProblem e) {
        return ResponseEntity.status(e.status).body(new AiDtos.Error(e.code,e.getMessage(),e.retryable));
    }
    @ExceptionHandler({MethodArgumentNotValidException.class,HttpMessageNotReadableException.class})
    public ResponseEntity<AiDtos.Error> input(Exception e) {
        return ResponseEntity.badRequest().body(new AiDtos.Error("INVALID_INPUT","메시지·모드·요청 번호를 확인해 주세요. 메시지는 2,000자까지 보낼 수 있어요.",false));
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<AiDtos.Error> other(Exception e) {
        return ResponseEntity.internalServerError().body(new AiDtos.Error("INTERNAL_ERROR","요청을 처리하지 못했어요. 잠시 후 다시 시도해 주세요.",true));
    }
}
