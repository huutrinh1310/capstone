package com.elite_brain.elite_brain_be.services;

import com.elite_brain.elite_brain_be.model.entity.Topic;

import java.util.List;

public interface TopicService {
    List<Topic> findByTopicName(String topicName);

    Topic findById(Long id);
}
