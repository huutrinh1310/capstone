package com.elite_brain.elite_brain_be.security;

import com.elite_brain.elite_brain_be.enums.UserRole;
import com.elite_brain.elite_brain_be.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final TokenProvider tokenProvider;
    private final TokenRepository tokenRepository;

    public SecurityConfiguration(TokenProvider tokenProvider, TokenRepository tokenRepository) {
        this.tokenProvider = tokenProvider;
        this.tokenRepository = tokenRepository;
    }
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers((request) -> {
            String path = request.getServletPath();
            return path.startsWith("/swagger-ui/") || path.startsWith("/swagger-resources") || path.startsWith("/v3/api-docs")
                    || path.startsWith("/api/v1") || path.startsWith("/") || path.startsWith(" ");
        });
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/admin/**").hasRole(UserRole.ADMIN.name())
                        .anyRequest().authenticated()
                )
                .httpBasic()
                .and()
                .apply(new JwtFilterConfiguration(tokenProvider, tokenRepository))
                .and()
                .logout()
                .logoutUrl("/auth/logout")
                .addLogoutHandler(new JwtLogoutHandler(tokenRepository))
                .logoutSuccessHandler(
                        (request, response, authentication) ->
                                SecurityContextHolder.clearContext()
                )
        ;
        return http.build();
    }
}
