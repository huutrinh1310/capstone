package com.elite_brain.elite_brain_be.services.impl;

import com.elite_brain.elite_brain_be.enums.TokenType;
import com.elite_brain.elite_brain_be.enums.UserRole;
import com.elite_brain.elite_brain_be.model.entity.Account;
import com.elite_brain.elite_brain_be.model.entity.Token;
import com.elite_brain.elite_brain_be.payload.request.LoginRequest;
import com.elite_brain.elite_brain_be.payload.request.RegisterRequest;
import com.elite_brain.elite_brain_be.payload.request.RegisterWithoutVerifyRequest;
import com.elite_brain.elite_brain_be.payload.response.AccountResponse;
import com.elite_brain.elite_brain_be.payload.response.LoginResponse;
import com.elite_brain.elite_brain_be.payload.response.RegisterResponse;
import com.elite_brain.elite_brain_be.repository.AccountRepository;
import com.elite_brain.elite_brain_be.repository.TokenRepository;
import com.elite_brain.elite_brain_be.security.TokenProvider;
import com.elite_brain.elite_brain_be.services.AccountService;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponseWrapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final TokenProvider tokenProvider;
    private final AccountRepository accountRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private final ModelMapper modelMapper;

    @Override
    public Optional<Account> findByEmail(String email) {
        return accountRepository.findByEmailAndDeletedFalse(email);
    }

    public RegisterResponse register(RegisterRequest request) {
        Account account = new Account();
        account.setUsername(request.getUsername());
        account.setFirstName(request.getFirstname());
        account.setLastName(request.getLastname());
        account.setEmail(request.getEmail());
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        account.setRole(UserRole.USER);
        account.setDeleted(false);

        //---
        account.setOtp(request.getOtp());
        account.setOtpCreationTime(request.getOtpCreationTime());
        //---
        try {
            accountRepository.save(account);
            return RegisterResponse.builder().message("Register successfully").build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return RegisterResponse.builder().message("Register fail").build();
        // thông báo lỗi
//        response.sendError(HttpStatus.UNAUTHORIZED.value(), "Unauthorized");
    }

    private void saveUserToken(Authentication authentication, String accessToken) {
        Account account = accountRepository.findByUsernameAndDeletedFalse(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Token token = new Token();
        token.setAccount(account);
        token.setToken(accessToken);
        token.setTokenType(TokenType.REFRESH);
        token.setExpired(false);
        token.setRevoked(false);
        tokenRepository.save(token);
    }

    public LoginResponse login(LoginRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        );
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        String accessToken = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);
        revokeAllUserTokens(authentication);
        saveUserToken(authentication, accessToken);
        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    private void revokeAllUserTokens(Authentication authentication) {
        List<Token> validUserTokens = tokenRepository.findAllByUserEmail(authentication.getName());
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public LoginResponse refreshToken(HttpServletRequestWrapper request, HttpServletResponseWrapper response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        refreshToken = authHeader.substring(7);
        Authentication authentication = tokenProvider.getAuthentication(refreshToken);
        if (authentication != null) {
            if (tokenProvider.isTokenValidate(refreshToken, authentication)) {
                String accessToken = tokenProvider.generateToken(authentication);
                revokeAllUserTokens(authentication);
                saveUserToken(authentication, accessToken);
                return LoginResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
            }
        }
        return null;
    }

    @Override
    public AccountResponse getProfile(HttpServletRequestWrapper request, HttpServletResponseWrapper response) {
        String token = getTokenFromRequestHeader(request);
        if (token == null) {
            return null;
        }
        Authentication authentication = tokenProvider.getAuthentication(token);
        if (authentication == null) {
            return null;
        }
        Account account = accountRepository.findByUsernameAndDeletedFalse(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return modelMapper.map(account, AccountResponse.class);
    }

    @Override
    public void registerWithoutVerify(RegisterWithoutVerifyRequest request) {
        Account account = modelMapper.map(request, Account.class);
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        account.setRole(UserRole.USER);
        account.setFirstName(request.getUsername());
        account.setLastName(request.getUsername());
        account.setDeleted(false);
        account.setVerified(true);
        account.setActive(true);
        try {
            accountRepository.save(account);
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @Override
    public void logout(HttpServletRequestWrapper request, HttpServletResponseWrapper response) {
        String token = getTokenFromRequestHeader(request);
        if (token == null) {
            return;
        }
        Authentication authentication = tokenProvider.getAuthentication(token);
        if (authentication == null) {
            return;
        }
        revokeAllUserTokens(authentication);
    }

    private String getTokenFromRequestHeader(HttpServletRequestWrapper request) {
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            return header.replace("Bearer ", "");
        } else {
            return null;
        }
    }

    @Override
    public boolean deleteAccount(Account account) {
        try {
            account.setDeleted(true);
            accountRepository.save(account);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @Override
    public boolean updateAccount(Account t) {
        try {
            accountRepository.save(t);
        } catch (Exception e) {
            return false;
        }
        return true;
    }
}
