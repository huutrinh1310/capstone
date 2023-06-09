package com.elite_brain.elite_brain_be.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface BaseRepository<T, ID>
        extends PagingAndSortingRepository<T, ID>,
        CrudRepository<T, ID>,
        JpaSpecificationExecutor<T> {

    List<T> findByDeletedFalse();

    Optional<T> findByIdAndDeletedFalse(ID id);
}
