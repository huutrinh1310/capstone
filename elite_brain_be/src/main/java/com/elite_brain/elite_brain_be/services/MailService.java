package com.elite_brain.elite_brain_be.services;

import jakarta.mail.MessagingException;

public interface MailService {
    void sendOtpByEmail(String to, String subject, String message) throws MessagingException;
}
