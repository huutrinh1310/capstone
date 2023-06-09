package com.elite_brain.elite_brain_be.logic.impl;

import com.elite_brain.elite_brain_be.logic.AccountLogic;
import com.elite_brain.elite_brain_be.model.entity.Account;
import com.elite_brain.elite_brain_be.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AccountLogicImpl implements AccountLogic {
    private final AccountRepository accountRepository;
    @Override
    public Optional<Account> findByEmail(String email) {
        return accountRepository.findByEmailAndDeletedFalse(email);
    }

    @Override
    public Optional<Account> findByUsername(String username) {
        return accountRepository.findByUsernameAndDeletedFalse(username);
    }
}
