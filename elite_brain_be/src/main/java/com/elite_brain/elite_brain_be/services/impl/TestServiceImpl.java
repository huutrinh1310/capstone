package com.elite_brain.elite_brain_be.services.impl;

import com.elite_brain.elite_brain_be.model.entity.Test;
import com.elite_brain.elite_brain_be.repository.TestRepository;
import com.elite_brain.elite_brain_be.services.TestService;
import org.springframework.stereotype.Service;

@Service
public class TestServiceImpl
        extends BaseServiceImpl<Test, Integer, TestRepository> implements TestService {
    public TestServiceImpl(TestRepository testRepository) {
        super(testRepository);
    }


}
