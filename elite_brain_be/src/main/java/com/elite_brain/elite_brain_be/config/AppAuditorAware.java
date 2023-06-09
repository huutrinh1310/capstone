package com.elite_brain.elite_brain_be.config;

import com.elite_brain.elite_brain_be.security.SecurityUtil;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AppAuditorAware implements AuditorAware<String> {
    //sẽ tự động kích hoạt đến cai annotation @CreatedBy, @LastModifiedBy
    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of(SecurityUtil.getCurrentUserLogin().orElse("Anonymous"));
    }
}
