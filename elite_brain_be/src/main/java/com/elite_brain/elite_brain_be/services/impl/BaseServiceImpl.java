package com.elite_brain.elite_brain_be.services.impl;

import com.elite_brain.elite_brain_be.model.entity.AbstractAuditingEntity;
import com.elite_brain.elite_brain_be.repository.BaseRepository;
import com.elite_brain.elite_brain_be.services.BaseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public class BaseServiceImpl<T extends AbstractAuditingEntity, ID, R extends BaseRepository> implements BaseService<T, ID> {

    private final R baseRepository;

    public BaseServiceImpl(R baseRepository) {
        this.baseRepository = baseRepository;
    }

    @Override
    public List<T> findAll() {
        return (List<T>) baseRepository.findAll();
    }

    @Override
    public Optional<T> findById(ID id) {
        return baseRepository.findByIdAndDeletedFalse(id);
    }

    @Override
    public Page<T> findPaging(Specification<T> specification, Pageable pageable) {
        return baseRepository.findAll(specification, pageable);
    }

    @Override
    public boolean save(T element) {
        try {
            element.setDeleted(false);
            baseRepository.save(element);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @Override
    public boolean update(T element) {
        try{
            element.setDeleted(false);
            baseRepository.save(element);
        }catch (Exception e){
            return false;
        }
        return true;
    }

    @Override
    public boolean delete(T element) {
        try{
            element.setDeleted(true);
            baseRepository.save(element);
        }catch (Exception e){
            return false;
        }
        return true;
    }
}
