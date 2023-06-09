package com.elite_brain.elite_brain_be.security;

import com.elite_brain.elite_brain_be.enums.UserRole;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public final class SecurityUtil {

    public static Optional<String> getCurrentUserLogin() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();

        Object object = authentication.getPrincipal();
        if (object instanceof UserDetails) {
            return Optional.of(((UserDetails) object).getUsername());
        }
        return Optional.empty();
    }

    public static Optional<UserRole> getRoleCurrentUserLogin(){
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();

        return authentication.getAuthorities().stream().map(grantedAuthority -> {
            String role = grantedAuthority.getAuthority();
            // ROLE_USER -> USER
            return UserRole.valueOf(role.substring(5));
        }).findFirst();
    }

    public static boolean isAdmin() throws IllegalAccessException {
        Optional<UserRole> userRole = getRoleCurrentUserLogin();
        return userRole.orElseThrow(IllegalAccessException::new).equals(UserRole.ADMIN);
    }

    public static boolean isUser() throws IllegalAccessException {
        Optional<UserRole> userRole = getRoleCurrentUserLogin();
        return userRole.orElseThrow(IllegalAccessException::new).equals(UserRole.USER);
    }
}
