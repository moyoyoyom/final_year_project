package com.project.final_year_project;

import java.sql.SQLException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@EntityScan(basePackages = "com.project.final_year_project.model")
public class FinalYearProjectApplication extends SpringBootServletInitializer {

	public static void main(String[] args) throws SQLException {
		SpringApplication.run(FinalYearProjectApplication.class, args);
	}
}
