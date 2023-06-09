package com.elite_brain.elite_brain_be.logic.impl;

import com.elite_brain.elite_brain_be.logic.TopicLogic;
import com.elite_brain.elite_brain_be.model.entity.Topic;
import com.elite_brain.elite_brain_be.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TopicLogicImpl implements TopicLogic {
    private final TopicRepository topicRepository;

    @Override
    public List<Topic> findByTopicName(String topicName) {
        return topicRepository.findByTopicNameContainingIgnoreCaseAndDeletedFalse(topicName);
    }
    @Override
    public Topic findById(Long id) {
        return topicRepository.findById(id).get();
    }
}
