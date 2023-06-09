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
@Table(name = "Guest")
public class Guest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "guest_id")
    private Integer id;

    @Column(nullable = false, unique = true)
    private String phone;

    @OneToMany(mappedBy = "guest")
    private List<GuestTest> guestTests;
}
