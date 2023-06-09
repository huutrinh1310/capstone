package com.elite_brain.elite_brain_be.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Test")
public class Test extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "test_id")
    private Integer id;

    @Column(unique = true, length = 100, nullable = false)
    private String testName;

    private boolean isPublic;

    @OneToMany(mappedBy = "test")
    private Set<QuestionTest> questionTests;

    @OneToMany(mappedBy = "test")
    private Set<TestResult> testResults;

    @OneToMany(mappedBy = "test")
    private List<GuestTest> guestTests;
}
