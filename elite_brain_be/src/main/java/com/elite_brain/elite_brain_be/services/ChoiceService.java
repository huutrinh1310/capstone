package com.elite_brain.elite_brain_be.services;

import com.elite_brain.elite_brain_be.model.entity.Choice;

import java.util.List;

public interface ChoiceService {

    List<Choice> findByQuestion(Integer id);
}
