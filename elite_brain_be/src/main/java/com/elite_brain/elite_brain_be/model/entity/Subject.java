package com.elite_brain.elite_brain_be.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Subject")
public class Subject extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id")
    private Long id;

    @Column(unique = true, length = 100, nullable = false)
    private String subjectName;

    @OneToMany(mappedBy = "subject")
    private List<Topic> topics;
}
