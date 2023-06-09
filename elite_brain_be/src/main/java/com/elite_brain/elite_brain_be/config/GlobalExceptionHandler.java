package com.elite_brain.elite_brain_be.config;

import com.elite_brain.elite_brain_be.exception.BadRequestException;
import com.elite_brain.elite_brain_be.exception.NotFoundException;
import com.elite_brain.elite_brain_be.exception.UnAuthorizationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.nio.file.AccessDeniedException;

//bất kỳ gặp lỗi nào thì sẽ chạy vào đây ít nhất 1 lần
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ResponseBody
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(AccessDeniedException.class)
    public String handleForbiddenException(AccessDeniedException e) {
        return e.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    public String handleBadRequestException(BadRequestException e) {
        return e.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UnAuthorizationException.class)
    public String handleUnAuthorizationException(UnAuthorizationException e) {
        System.out.println("looi khogn dang nhap duoc");
        return e.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public String handleNotFoundException(NotFoundException e) {
        return e.getMessage();
    }


//    @ResponseBody
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    @ExceptionHandler(Exception.class)
//    public String handleException(Exception e) {
//        System.out.println("loi khong xac dinh");
//        return e.getMessage();
//    }
}
