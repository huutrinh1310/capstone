package com.elite_brain.elite_brain_be.logic;

import com.elite_brain.elite_brain_be.model.entity.Question;

import java.util.List;
import java.util.Optional;

public interface QuestionLogic {
    Optional<Question> create(Question question);

    Optional<Question> findTopByIdOrderByIdDesc();

    List<Question> findAll();

    Optional<Question> update(Question question);

    Optional<Question> delete(Question question);

    Optional<Question> findById(Integer id);

    List<Question> findByTopicId(Long topicId);
}
