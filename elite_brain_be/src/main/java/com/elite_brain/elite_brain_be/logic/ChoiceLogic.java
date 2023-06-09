package com.elite_brain.elite_brain_be.logic;

import com.elite_brain.elite_brain_be.model.entity.Choice;

import java.util.List;
import java.util.Optional;

public interface ChoiceLogic {
    Optional<Choice> save(Choice choice);

    Optional<Choice> update(Choice choice);

    List<Choice> findByQuestion(Integer id);
}
