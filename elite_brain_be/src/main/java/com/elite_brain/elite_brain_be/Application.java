package com.elite_brain.elite_brain_be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
//@EnableJpaAuditing(auditorAwareRef="appAuditorAware")
//how to use @CreatedBy, @LastModifiedBy except create account
//https://stackoverflow.com/questions/49873470/spring-data-jpa-auditing-annotation-not-working

public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
