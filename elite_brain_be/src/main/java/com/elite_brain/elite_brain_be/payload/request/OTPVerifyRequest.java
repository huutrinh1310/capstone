package com.elite_brain.elite_brain_be.payload.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OTPVerifyRequest {
    private String email;
    private String otp;
}
