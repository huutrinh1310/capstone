package com.elite_brain.elite_brain_be.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnAuthorizationException extends java.lang.RuntimeException {

    @Serial
    private static final long serialVersionUID = 1372210541405289235L;

    public UnAuthorizationException(String message) {super(message);}
}
