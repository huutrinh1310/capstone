package com.elite_brain.elite_brain_be.exception;

import java.io.Serial;

public class RuntimeException extends java.lang.RuntimeException {


    @Serial
    private static final long serialVersionUID = 1535482892314372535L;

    public RuntimeException(String message) {
        super(message);
    }

    public RuntimeException(String message, Throwable cause) {
        super(message, cause);
    }

    public RuntimeException(Throwable cause) {
        super(cause);
    }
}
