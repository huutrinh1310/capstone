package com.elite_brain.elite_brain_be.repository;

import com.elite_brain.elite_brain_be.model.entity.Topic;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends BaseRepository<Topic, Long>{
    List<Topic> findByTopicNameContainingIgnoreCaseAndDeletedFalse(String topicName);

    List<Topic> findBySubjectAndDeletedFalse(Long subjectId);

}
