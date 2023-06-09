package com.elite_brain.elite_brain_be.logic.impl;

import com.elite_brain.elite_brain_be.logic.QuestionLogic;
import com.elite_brain.elite_brain_be.model.entity.Question;
import com.elite_brain.elite_brain_be.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class QuestionLogicImpl implements QuestionLogic {

    private final QuestionRepository questionRepository;

    @Override
    public Optional<Question> create(Question question) {
        return Optional.of(questionRepository.save(question));
    }

    @Override
    public Optional<Question> findTopByIdOrderByIdDesc() {
        return questionRepository.findFirstByOrderByIdDesc();
    }

    @Override
    public List<Question> findAll() {
        return (List<Question>) questionRepository.findAll();
    }

    @Override
    public Optional<Question> update(Question question) {
        return Optional.of(questionRepository.save(question));
    }

    @Override
    public Optional<Question> delete(Question question) {
        question.setDeleted(true);
        return Optional.of(questionRepository.save(question));
    }

    @Override
    public Optional<Question> findById(Integer id) {
        return questionRepository.findByIdAndDeletedFalse(id);
    }

    @Override
    public List<Question> findByTopicId(Long topicId) {
        return questionRepository.findByTopicIdAndDeletedFalse(topicId);
    }
}
