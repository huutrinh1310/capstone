package com.elite_brain.elite_brain_be.security;

import com.elite_brain.elite_brain_be.logic.AccountLogic;
import com.elite_brain.elite_brain_be.model.entity.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

//    private final AccountService accountService;

    private final AccountLogic accountLogic;
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        Optional<Account> accountOptional = accountLogic.findByUsername(username);

        if (accountOptional.isEmpty()) {
            throw new UsernameNotFoundException("Account: \"" + username + "\" is not exists!");
        }

        Account account = accountOptional.get();
        List<GrantedAuthority> roles = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + account.getRole().toString()));


        return new User(account.getUsername(),
                account.getPassword(),
                roles);
    }
}
