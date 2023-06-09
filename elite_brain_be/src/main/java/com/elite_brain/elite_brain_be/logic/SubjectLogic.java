package com.elite_brain.elite_brain_be.logic;

import com.elite_brain.elite_brain_be.model.entity.Subject;

import java.util.List;

public interface SubjectLogic {
    Subject findBySubjectName(String subjectName);

    List<Subject> findAll();

    List<Subject> findByTopicName(String topicName);
}
