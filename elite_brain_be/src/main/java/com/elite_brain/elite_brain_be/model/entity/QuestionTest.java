package com.elite_brain.elite_brain_be.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Question_Test")
public class QuestionTest {

    @Id
    @ManyToOne
    private Question question;

    @Id
    @ManyToOne
    private Test test;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuestionTest that = (QuestionTest) o;
        return Objects.equals(question, that.question) && Objects.equals(test, that.test);
    }

    @Override
    public int hashCode() {
        return Objects.hash(question, test);
    }
}
