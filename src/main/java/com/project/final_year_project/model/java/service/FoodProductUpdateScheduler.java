package com.project.final_year_project.model.java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class FoodProductUpdateScheduler {
    private final FoodProductCSVPopulationService foodProductPopulationService;
    private final FoodProductUpdateService foodProductUpdateService;

    @Autowired
    public FoodProductUpdateScheduler(FoodProductCSVPopulationService foodProductPopulationService,
            FoodProductUpdateService foodProductUpdateService) {
        this.foodProductPopulationService = foodProductPopulationService;
        this.foodProductUpdateService = foodProductUpdateService;
    }

    // updates the food products table daily at midnight
    @Scheduled(cron = "0 0 0 * * ?")
    public void updateFoodProducts() {
        foodProductPopulationService.writeFoodProductCSV();
        foodProductUpdateService.updateFoodProductsFromStagingTable();
    }
}
