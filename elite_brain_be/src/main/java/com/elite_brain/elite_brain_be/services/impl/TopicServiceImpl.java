package com.elite_brain.elite_brain_be.services.impl;

import com.elite_brain.elite_brain_be.logic.TopicLogic;
import com.elite_brain.elite_brain_be.model.entity.Topic;
import com.elite_brain.elite_brain_be.services.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {
    private final TopicLogic topicLogic;
    @Override
    public List<Topic> findByTopicName(String topicName) {
        return topicLogic.findByTopicName(topicName);
    }

    @Override
    public Topic findById(Long id) {
        return topicLogic.findById(id);
    }
}
