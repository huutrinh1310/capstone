package com.elite_brain.elite_brain_be.services.impl;

import com.elite_brain.elite_brain_be.logic.ChoiceLogic;
import com.elite_brain.elite_brain_be.logic.QuestionLogic;
import com.elite_brain.elite_brain_be.model.dto.ChoiceDTO;
import com.elite_brain.elite_brain_be.model.entity.Choice;
import com.elite_brain.elite_brain_be.model.entity.Question;
import com.elite_brain.elite_brain_be.payload.response.CreateResponse;
import com.elite_brain.elite_brain_be.payload.response.DeleteResponse;
import com.elite_brain.elite_brain_be.payload.response.UpdateResponse;
import com.elite_brain.elite_brain_be.services.ChoiceService;
import com.elite_brain.elite_brain_be.services.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService{

    private final QuestionLogic questionLogic;

    private final ChoiceLogic choiceLogic;

    private final ChoiceService choiceService;

    public CreateResponse save(Question question, List<Choice> choiceList) {
        boolean b = true;
        try {
            question.setDeleted(false);
            for (Choice choice : choiceList) {
                if (choiceLogic.save(choice).isEmpty()) {
                    b = false;
                }
            }
            if (questionLogic.create(question).isEmpty()) {
                b = false;
            }
        } catch (Exception e) {
            throw new IllegalArgumentException();
        }
        return CreateResponse.builder().isCreate(b).build();
    }

    @Override
    public boolean save(Question question) {
        try {
            question.setDeleted(false);
            questionLogic.create(question);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @Override
    public Question findByNewestCreate() {
        return questionLogic.findTopByIdOrderByIdDesc().get();
    }

    @Override
    public List<Question> findAll() {
        return questionLogic.findAll();
    }

    @Override
    public UpdateResponse update(Question question, List<Choice> choiceList) {
        boolean b = true;
        try {
            question.setDeleted(false);
            for (Choice choice : choiceList) {
                if (choiceLogic.update(choice).isEmpty()) {
                    b = false;
                }
            }
            if (questionLogic.update(question).isEmpty()) {
                b = false;
            }
        } catch (Exception e) {
            throw new IllegalArgumentException();
        }
        return UpdateResponse.builder().isUpdate(b).build();
    }

    @Override
    public DeleteResponse delete(Question question) {
        boolean b = true;
        try {
            if (questionLogic.delete(question).isEmpty()) {
                b = false;
            }
        } catch (Exception e) {
            throw new IllegalArgumentException();
        }
        return DeleteResponse.builder().isDelete(b).build();
    }

    @Override
    public Optional<Question> findById(Integer id) {
        return questionLogic.findById(id);
    }

    @Override
    public List<Choice> updateChoiceForQuestion(List<ChoiceDTO> choiceDTOList, Question question) {

        List<Choice> choices = new ArrayList<>();

        List<Choice> choiceList = new ArrayList<>();

        List<Choice> listChoice = choiceService.findByQuestion(question.getId());

        for (ChoiceDTO choiceDto : choiceDTOList) {
            Choice choice = new Choice();
            BeanUtils.copyProperties(choiceDto, choice);
            choice.setQuestion(question);
            choiceList.add(choice);
        }

        for (int i = 0; i < choiceList.size(); i++) {
            Choice choice = choiceList.get(i);
            choice.setId(listChoice.get(i).getId());
            choices.add(choice);
        }

        return choices;
    }

    @Override
    public List<Choice> addChoiceForQuestion(List<ChoiceDTO> choiceDTOList, Question question) {

        question = findByNewestCreate();

        List<Choice> choiceList = new ArrayList<>();

        for (ChoiceDTO choiceDto : choiceDTOList) {
            Choice choice = new Choice();
            BeanUtils.copyProperties(choiceDto, choice);
            choice.setQuestion(question);
            choiceList.add(choice);
        }
        return choiceList;
    }

    @Override
    public List<Question> findByTopicId(Long topicId) {
        return questionLogic.findByTopicId(topicId);
    }
}
