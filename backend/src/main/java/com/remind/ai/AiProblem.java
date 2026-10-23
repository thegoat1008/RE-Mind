package com.remind.ai;

/** No upstream body, key or conversation text is exposed in exceptions. */
public final class AiProblem extends RuntimeException {
    final int status;
    final String code;
    final boolean retryable;
    public AiProblem(int status, String code, String message, boolean retryable) {
        super(message); this.status=status; this.code=code; this.retryable=retryable;
    }
    public static AiProblem unavailable() {
        return new AiProblem(503,"AI_UNAVAILABLE","AI에 연결하지 못했어요. 잠시 후 다시 시도해 주세요.",true);
    }
}
