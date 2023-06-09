package com.elite_brain.elite_brain_be.services;

import com.elite_brain.elite_brain_be.model.dto.ChoiceDTO;
import com.elite_brain.elite_brain_be.model.entity.Choice;
import com.elite_brain.elite_brain_be.model.entity.Question;
import com.elite_brain.elite_brain_be.payload.response.CreateResponse;
import com.elite_brain.elite_brain_be.payload.response.DeleteResponse;
import com.elite_brain.elite_brain_be.payload.response.UpdateResponse;

import java.util.List;
import java.util.Optional;

public interface QuestionService{

    CreateResponse save(Question question, List<Choice> choiceList);

    boolean save(Question question);

    Question findByNewestCreate();

    List<Question> findAll();

    UpdateResponse update(Question question, List<Choice> choiceList);

    DeleteResponse delete(Question question);

    Optional<Question> findById(Integer id);

    List<Choice> updateChoiceForQuestion(List<ChoiceDTO> choiceDTOList, Question question);

    List<Choice> addChoiceForQuestion(List<ChoiceDTO> choiceDTOList, Question question);

    List<Question> findByTopicId(Long topicId);
}
