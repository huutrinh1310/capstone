package com.elite_brain.elite_brain_be.controller;

import com.elite_brain.elite_brain_be.model.dto.ChoiceDTO;
import com.elite_brain.elite_brain_be.model.dto.QuestionDTO;
import com.elite_brain.elite_brain_be.model.entity.Choice;
import com.elite_brain.elite_brain_be.model.entity.Question;
import com.elite_brain.elite_brain_be.model.entity.Topic;
import com.elite_brain.elite_brain_be.payload.response.CreateResponse;
import com.elite_brain.elite_brain_be.payload.response.DeleteResponse;
import com.elite_brain.elite_brain_be.payload.response.UpdateResponse;
import com.elite_brain.elite_brain_be.repository.TopicRepository;
import com.elite_brain.elite_brain_be.services.ChoiceService;
import com.elite_brain.elite_brain_be.services.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    private final ChoiceService choiceService;

    private final TopicRepository topicRepository;


//    @GetMapping({"/", ""})
//    public ResponseEntity<List<Subject>> showListSubject(@RequestParam(defaultValue = "") String keyword) {
//        if(keyword == null || keyword.isBlank()) {
//            List<Subject> subjects = subjectService.findAll();
//            return ResponseEntity.ok(subjects);
//        }
//        else {
//            List<Subject> subjects = new ArrayList<>();
//            subjects.add(subjectService.findBySubjectName(keyword));
//            return ResponseEntity.ok(subjects);
//        }
//    }

    @GetMapping
    public ResponseEntity<List<Question>> showListQuestionByTopicId(@RequestParam Long topicId) {
        return ResponseEntity.ok(questionService.findByTopicId(topicId));
    }

    @PostMapping("/create")
    public ResponseEntity<CreateResponse> create(@RequestBody QuestionDTO questionDto) {
        //TODO: Validate value
        Question question = new Question();
        BeanUtils.copyProperties(questionDto, question);
        question.setTopic(topicRepository.findById(questionDto.getTopicId()).orElseThrow(() -> new RuntimeException("Topic not found")));
        questionService.save(question);

        List<ChoiceDTO> choiceDTOList = questionDto.getChoiceDTOList();

        List<Choice> choiceList = questionService.addChoiceForQuestion(choiceDTOList, question);

        question.setQuestionChoices(choiceList);
        return ResponseEntity.ok(questionService.save(question, choiceList));
    }

    @PutMapping ("/update/{id}")
    public ResponseEntity<UpdateResponse> update(@PathVariable Integer id, @RequestBody QuestionDTO questionDto) {
        //TODO: Validate value when description equals existed description
        Question question = new Question();
        BeanUtils.copyProperties(questionDto, question);
        question.setId(id);

        List<ChoiceDTO> choiceDTOList = questionDto.getChoiceDTOList();

        List<Choice> choiceList = questionService.updateChoiceForQuestion(choiceDTOList, question);

        return ResponseEntity.ok(questionService.update(question, choiceList));
    }

    @DeleteMapping ("delete/{id}")
    public ResponseEntity<DeleteResponse> delete(@PathVariable Integer id) {
        Question question = questionService.findById(id).orElse(new Question());
        questionService.delete(question);
        return ResponseEntity.ok(questionService.delete(question));
    }
}
