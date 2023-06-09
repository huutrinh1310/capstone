package com.elite_brain.elite_brain_be.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Class")
public class ClassEntity {

    @Id
    @Column(name = "class_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "class_name", nullable = false, unique = true)
    private String classEntityName;

    @OneToMany(mappedBy = "classEntityTrainee")
    private List<Account> accounts;

    @ManyToOne
    @JoinColumn(name = "account_id")
    @JsonIgnore
    private Account accountManager;
}
