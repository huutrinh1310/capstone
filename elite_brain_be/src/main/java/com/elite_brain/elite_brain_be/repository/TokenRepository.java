package com.elite_brain.elite_brain_be.repository;

import com.elite_brain.elite_brain_be.model.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query(value = "SELECT t FROM Token t " +
            "JOIN Account a ON t.account.id = a.id " +
            "WHERE a.email = :email and (t.expired = false or t.revoked = false)")
    List<Token> findAllByUserEmail(String email);

    @Query(value = "SELECT t FROM Token t " +
            "JOIN Account a ON t.account.id = a.id " +
            "WHERE a.username = :username and (t.expired = false or t.revoked = false)")
    List<Token> findAllByUsername(String username);

    Optional<Token> findByToken(String token);
}
