package com.project.final_year_project;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FinalYearProjectApplication {

	public static void main(String[] args) {
		// SpringApplication.run(FinalYearProjectApplication.class, args);
		Scheduler schedule = new Scheduler();
		schedule.runDailyTask();
	}

}
