package com.project.final_year_project.model.java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class FoodProductCSVImportService {
    private final JdbcTemplate jdbcTemplate;

    // Change this to the actual path later
    @Value("${app.csv.path:/data/foodproducts.csv}")
    private String foodProductsCSVFilePath;

    @Autowired
    public FoodProductCSVImportService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void loadFoodProductsCSVIntoStagingTable() {
        String loadIntoStagingQuery = String.format(
                "LOAD DATA INFILE '%s' " +
                        "INTO TABLE FoodProductStaging " +
                        "FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' " +
                        "LINES TERMINATED BY '\n' IGNORE 1 ROWS " +
                        "(code, brands, imageUrl, ingredientsText, keywords, nutritionalInformation, productName, quantity, categories);",
                foodProductsCSVFilePath);

        jdbcTemplate.execute(loadIntoStagingQuery);
        System.out.println("Finished loading food products into the staging table");
    }
}
