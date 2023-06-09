package com.elite_brain.elite_brain_be.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Guest_Test")
public class GuestTest {

    @Id
    @ManyToOne
    private Guest guest;

    @Id
    @ManyToOne
    private Test test;

    @Column(unique = true, nullable = false)
    private String code;

    private double mark;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GuestTest guestTest = (GuestTest) o;
        return Objects.equals(guest, guestTest.guest) && Objects.equals(test, guestTest.test);
    }

    @Override
    public int hashCode() {
        return Objects.hash(guest, test);
    }
}
