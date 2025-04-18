package com.project.final_year_project;

import java.sql.SQLException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EntityScan(basePackages = "com.project.final_year_project.model")
@EnableJpaRepositories("com.project.final_year_project.model.java.data.repository")
public class FinalYearProjectApplication extends SpringBootServletInitializer {

	public static void main(String[] args) throws SQLException {
		SpringApplication.run(FinalYearProjectApplication.class, args);
	}
}
