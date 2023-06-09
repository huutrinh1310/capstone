package com.elite_brain.elite_brain_be.logic;

import com.elite_brain.elite_brain_be.model.entity.Account;

import java.util.Optional;

public interface AccountLogic {
    Optional<Account> findByEmail(String email);
    Optional<Account> findByUsername(String username);
}
