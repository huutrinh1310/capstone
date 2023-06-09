package com.elite_brain.elite_brain_be.logic.impl;

import com.elite_brain.elite_brain_be.logic.ChoiceLogic;
import com.elite_brain.elite_brain_be.model.entity.Choice;
import com.elite_brain.elite_brain_be.repository.ChoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ChoiceLogicImpl implements ChoiceLogic {

    private final ChoiceRepository choiceRepository;

    @Override
    public Optional<Choice> save(Choice choice) {
        return Optional.of(choiceRepository.save(choice));
    }

    @Override
    public Optional<Choice> update(Choice choice) {
        return Optional.of(choiceRepository.save(choice));
    }

    @Override
    public List<Choice> findByQuestion(Integer id) {
        return choiceRepository.findByQuestionId(id);
    }
}
