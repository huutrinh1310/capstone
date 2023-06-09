package com.elite_brain.elite_brain_be.controller;

import com.elite_brain.elite_brain_be.model.entity.Subject;
import com.elite_brain.elite_brain_be.services.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/subject")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService subjectService;

    @GetMapping({"/", ""})
    public ResponseEntity<List<Subject>> showListSubject(@RequestParam(defaultValue = "") String topicName){
        if(topicName.isEmpty()) {
            List<Subject> subjects = subjectService.findAll();
            return ResponseEntity.ok(subjects);
        }
        else {
            List<Subject> subjects = subjectService.findByTopicName(topicName);
            return ResponseEntity.ok(subjects);
        }
    }
}
