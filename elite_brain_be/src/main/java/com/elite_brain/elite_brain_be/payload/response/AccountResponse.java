package com.elite_brain.elite_brain_be.payload.response;

import com.elite_brain.elite_brain_be.enums.UserRole;
import lombok.Data;

@Data
public class AccountResponse {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String avatar;
    private UserRole role;
}
