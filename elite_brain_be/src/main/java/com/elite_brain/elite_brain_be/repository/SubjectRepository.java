package com.elite_brain.elite_brain_be.repository;

import com.elite_brain.elite_brain_be.model.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Optional<Subject> findBySubjectNameContainingIgnoreCaseAndDeletedFalse(String subjectName);

    List<Subject> findByDeletedFalse();


}
