package com.elite_brain.elite_brain_be.controller;

import com.elite_brain.elite_brain_be.model.entity.Account;
import com.elite_brain.elite_brain_be.payload.request.LoginRequest;
import com.elite_brain.elite_brain_be.payload.request.OTPVerifyRequest;
import com.elite_brain.elite_brain_be.payload.request.RegisterRequest;
import com.elite_brain.elite_brain_be.payload.request.RegisterWithoutVerifyRequest;
import com.elite_brain.elite_brain_be.payload.response.AccountResponse;
import com.elite_brain.elite_brain_be.payload.response.LoginResponse;
import com.elite_brain.elite_brain_be.payload.response.LogoutResponse;
import com.elite_brain.elite_brain_be.payload.response.RegisterResponse;
import com.elite_brain.elite_brain_be.services.AccountService;
import com.elite_brain.elite_brain_be.services.MailService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponseWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService service;
    private final MailService mailService;
    private final static long OTP_EXPIRATION_MINUTES = 10;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) throws MessagingException {
        // Generate OTP
        String otp = OTPGenerator.generateOtp();

        // Save the user, OTP, and OTP creation time
        request.setOtp(otp);
        request.setOtpCreationTime(LocalDateTime.now());
        //-------------
//        service.register(request);
        mailService.sendOtpByEmail(request.getEmail(), "OTP Verification", "Your OTP is: " + otp);
        return ResponseEntity.ok(service.register(request));
        //--------------
    }

    @PostMapping("/register-without-verify")
    public void registerWithVerify(@RequestBody RegisterWithoutVerifyRequest request) {
        service.registerWithoutVerify(request);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity verifyOtp(@RequestBody OTPVerifyRequest request) {
        Optional<Account> account = service.findByEmail(request.getEmail());

        if (account.isPresent() && account.get().getOtp().equals(request.getOtp())) {
            // Check if OTP has expired
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime otpCreationTime = account.get().getOtpCreationTime();
            if (otpCreationTime.plusMinutes(OTP_EXPIRATION_MINUTES).isBefore(now)) {
                service.deleteAccount(account.get());
                // OTP has expired
                return ResponseEntity.ok("OTP has expired");
            }
            // OTP verification successful
            account.get().setVerified(true);
            account.get().setActive(true);
            service.updateAccount(account.get());
            return ResponseEntity.ok("OTP verification successful!");
        } else {
            // OTP verification failed
            return ResponseEntity.ok("Invalid OTP");
        }
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<String> resendOtp(@RequestParam String email) {
        Optional<Account> account = service.findByEmail(email);
        if (account.isPresent()) {
            // Generate OTP
            String otp = OTPGenerator.generateOtp();

            // Save the user, OTP, and OTP creation time
            account.get().setOtp(otp);
            account.get().setOtpCreationTime(LocalDateTime.now());
            service.updateAccount(account.get());

            // Send the OTP to the user
            try {
                mailService.sendOtpByEmail(email, "OTP Verification", "Your OTP is: " + otp);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
            return ResponseEntity.ok("OTP sent successfully");
        } else {
            return ResponseEntity.ok("Account not found");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(service.login(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<LoginResponse> refreshToken(
            HttpServletRequestWrapper request,
            HttpServletResponseWrapper response
    ) throws IOException {
        return ResponseEntity.ok(service.refreshToken(request, response));
    }

    @GetMapping("/logout")
    public void logout(
            HttpServletRequestWrapper request,
            HttpServletResponseWrapper response
    ) {
        service.logout(request, response);
    }

    @GetMapping("/profile")
    public ResponseEntity<AccountResponse> getProfile(
            HttpServletRequestWrapper request,
            HttpServletResponseWrapper response
    ) {
        return ResponseEntity.ok(service.getProfile(request, response));
    }
}
