package com.elite_brain.elite_brain_be.model.entity;

import com.elite_brain.elite_brain_be.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Account")
public class Account extends AbstractAuditingEntity{

    @Id
    @Column(name = "account_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, length = 100, nullable = false)
    private String username;

    @Column(unique = true, length = 100, nullable = false)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 100)
    private String firstName;

    @Column(length = 100)
    private String lastName;

    private String avatar;

    private boolean isVerified;

    private boolean isActive;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private String otp;

    private LocalDateTime otpCreationTime;

    @OneToMany(mappedBy = "account")
    private List<TestResult> testResults;

    @OneToMany(mappedBy = "accountManager")
    private List<ClassEntity> classEntities;

    @ManyToOne
    @JoinColumn(name = "class_id")
    @JsonIgnore
    private ClassEntity classEntityTrainee;



}
