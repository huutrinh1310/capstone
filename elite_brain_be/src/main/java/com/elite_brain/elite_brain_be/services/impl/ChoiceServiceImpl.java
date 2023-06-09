package com.elite_brain.elite_brain_be.services.impl;

import com.elite_brain.elite_brain_be.logic.ChoiceLogic;
import com.elite_brain.elite_brain_be.model.entity.Choice;
import com.elite_brain.elite_brain_be.services.ChoiceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChoiceServiceImpl implements ChoiceService {

    final ChoiceLogic choiceLogic;

    public ChoiceServiceImpl(ChoiceLogic choiceLogic) {
        this.choiceLogic = choiceLogic;
    }

    @Override
    public List<Choice> findByQuestion(Integer id) {
        return choiceLogic.findByQuestion(id);
    }
}
