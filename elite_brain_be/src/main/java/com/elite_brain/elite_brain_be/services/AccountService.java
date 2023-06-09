package com.elite_brain.elite_brain_be.services;

import com.elite_brain.elite_brain_be.model.entity.Account;
import com.elite_brain.elite_brain_be.payload.request.LoginRequest;
import com.elite_brain.elite_brain_be.payload.request.RegisterRequest;
import com.elite_brain.elite_brain_be.payload.request.RegisterWithoutVerifyRequest;
import com.elite_brain.elite_brain_be.payload.response.AccountResponse;
import com.elite_brain.elite_brain_be.payload.response.LoginResponse;
import com.elite_brain.elite_brain_be.payload.response.RegisterResponse;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponseWrapper;

import java.io.IOException;
import java.util.Optional;

public interface AccountService {

    Optional<Account> findByEmail(String email);

    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    LoginResponse refreshToken(HttpServletRequestWrapper request, HttpServletResponseWrapper response) throws IOException;

    void logout(HttpServletRequestWrapper request, HttpServletResponseWrapper response);

    AccountResponse getProfile(HttpServletRequestWrapper request, HttpServletResponseWrapper response);

    void registerWithoutVerify(RegisterWithoutVerifyRequest request);

    boolean deleteAccount(Account account);

    boolean updateAccount(Account account);
}
