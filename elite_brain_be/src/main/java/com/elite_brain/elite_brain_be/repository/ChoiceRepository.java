package com.elite_brain.elite_brain_be.repository;

import com.elite_brain.elite_brain_be.model.entity.Choice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChoiceRepository extends JpaRepository<Choice, Integer> {

    List<Choice> findByQuestionId(Integer id);
}
