package com.project.final_year_project;

import java.sql.SQLException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.project.final_year_project.model.java.API")
public class FinalYearProjectApplication extends SpringBootServletInitializer {

	public static void main(String[] args) throws SQLException {
		SpringApplication.run(FinalYearProjectApplication.class, args);

		/*
		 * FoodProductDao foodProductDao = new FoodProductDaoImpl(); List<FoodProduct>
		 * results = foodProductDao.getFoodProductByName("coca-cola"); for (FoodProduct
		 * foodProduct : results) { System.out.println(foodProduct.getAssignedID() + " "
		 * + foodProduct.getProductName()); }
		 */
	}
}
