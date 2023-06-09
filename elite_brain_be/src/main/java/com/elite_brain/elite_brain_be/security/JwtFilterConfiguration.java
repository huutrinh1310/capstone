package com.elite_brain.elite_brain_be.security;

import com.elite_brain.elite_brain_be.repository.TokenRepository;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtFilterConfiguration
        extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private final TokenProvider tokenProvider;
    private final TokenRepository tokenRepository;

    public JwtFilterConfiguration(TokenProvider tokenProvider, TokenRepository tokenRepository) {
        this.tokenProvider = tokenProvider;
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void configure(HttpSecurity builder) throws Exception {
        JwtFilter jwtFilter = new JwtFilter(tokenProvider, tokenRepository);
        builder.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
// lưu ý:
// 1. mỗi lần gọi sẽ generate ra token mới nhưng token cũ vẫn có thể dùng đc
// 2. session đc build trên server chạy lại thì session sẽ mất còn token thì restart server vẫn còn
// k thể revoke token sau khi cấp phát.
// nếu muốn vô hiệu tạo ra backlist token thì phải lưu lại token đã cấp phát và kiểm tra token
// đó có trong blacklist hay k?
// giải pháp là set expire time cho token ngắn. thêm cái token nữa là refesh token để lấy lại token
// refeshToken lưu vào db