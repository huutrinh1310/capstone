package com.elite_brain.elite_brain_be.payload.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    @NotBlank(message = "{common.not-blank.message}")
    private String username;
    @NotBlank(message = "{common.not-blank.message}")
    @Size(min = 6, message = "{common.size.message}")
    private String password;
}
