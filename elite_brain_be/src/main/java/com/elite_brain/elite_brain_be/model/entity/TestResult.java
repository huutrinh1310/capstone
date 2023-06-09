package com.elite_brain.elite_brain_be.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Test_Result")
public class TestResult {

    @Id
    @ManyToOne
    private Account account;

    @Id
    @ManyToOne
    private Test test;

    private LocalDateTime testDate;

    private LocalDateTime finishTime;

    private double totalMark;

    private String feedback;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TestResult that = (TestResult) o;
        return Objects.equals(account, that.account) && Objects.equals(test, that.test);
    }

    @Override
    public int hashCode() {
        return Objects.hash(account, test);
    }
}
