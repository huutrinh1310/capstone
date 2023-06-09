package com.elite_brain.elite_brain_be.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface BaseService<T, ID> {

    List<T> findAll();

    Optional<T> findById(ID id);

    Page<T> findPaging(Specification<T> specification, Pageable pageable);

    boolean save(T element);

    boolean update(T element);

    boolean delete(T element);
}
