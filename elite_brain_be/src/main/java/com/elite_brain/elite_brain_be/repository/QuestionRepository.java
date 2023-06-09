package com.elite_brain.elite_brain_be.repository;

import com.elite_brain.elite_brain_be.model.entity.Question;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends BaseRepository<Question, Integer> {

    Optional<Question> findFirstByOrderByIdDesc();

    List<Question> findByTopicIdAndDeletedFalse(Long topicId);


}
