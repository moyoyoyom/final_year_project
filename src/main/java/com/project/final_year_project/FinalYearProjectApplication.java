package com.project.final_year_project;

import java.sql.SQLException;
import java.util.List;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.project.final_year_project.model.java.FoodProduct;
import com.project.final_year_project.model.java.data.dao.FoodProductDao;
import com.project.final_year_project.model.java.data.daoImplementation.FoodProductDaoImpl;

@SpringBootApplication
public class FinalYearProjectApplication {

	public static void main(String[] args) throws SQLException {
		// SpringApplication.run(FinalYearProjectApplication.class, args);
		// Scheduler schedule = new Scheduler();
		// schedule.runDailyTask();

		FoodProductDao foodProductDao = new FoodProductDaoImpl();
		List<FoodProduct> results = foodProductDao.getFoodProductByName("Vegetable Oil");
		for (FoodProduct foodProduct : results) {
			System.out.println(foodProduct.getAssignedID() + " " + foodProduct.getProductName());
		}
	}
}
