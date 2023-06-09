package com.elite_brain.elite_brain_be.logic.impl;

import com.elite_brain.elite_brain_be.logic.SubjectLogic;
import com.elite_brain.elite_brain_be.model.entity.Subject;
import com.elite_brain.elite_brain_be.model.entity.Topic;
import com.elite_brain.elite_brain_be.repository.SubjectRepository;
import com.elite_brain.elite_brain_be.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class SubjectLogicImpl implements SubjectLogic {
    private final SubjectRepository subjectRepository;

    private final TopicRepository topicRepository;
    @Override
    public Subject findBySubjectName(String subjectName) {
        Optional<Subject> subject = subjectRepository.findBySubjectNameContainingIgnoreCaseAndDeletedFalse(subjectName);
        if(subject.isEmpty()){
            return null;
        }else{
            return subject.get();
        }
    }

    @Override
    public List<Subject> findAll() {
        return subjectRepository.findByDeletedFalse();
    }

    @Override
    public List<Subject> findByTopicName(String topicName) {
        List<Subject> subjects = new ArrayList<>();
        List<Topic> topics = topicRepository.findByTopicNameContainingIgnoreCaseAndDeletedFalse(topicName);
        for(Topic topic: topics){
            Subject subject = topic.getSubject();
            subject.setTopics(List.of(topic));
            subjects.add(subject);
        }
        return subjects;
    }
}
