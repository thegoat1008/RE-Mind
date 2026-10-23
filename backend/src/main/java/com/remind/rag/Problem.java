package com.remind.rag;

/** Expected failures have stable machine-readable codes; never return model credentials/logs. */
public final class Problem extends RuntimeException {
    private final int status;
    private final String code;
    private final boolean retryable;

    public Problem(int status, String code, String message, boolean retryable) {
        super(message);
        this.status = status;
        this.code = code;
        this.retryable = retryable;
    }
    public int status() { return status; }
    public String code() { return code; }
    public boolean retryable() { return retryable; }
}
