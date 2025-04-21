package com.project.final_year_project.model.java.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class FoodProductUpdateScheduler {
    private final FoodProductCSVPopulationService foodProductPopulationService;
    private final FoodProductUpdateService foodProductUpdateService;
    private final FileDownloader fileDownloader;

    @Autowired
    public FoodProductUpdateScheduler(FoodProductCSVPopulationService foodProductPopulationService,
            FoodProductUpdateService foodProductUpdateService, FileDownloader fileDownloader) {
        this.foodProductPopulationService = foodProductPopulationService;
        this.foodProductUpdateService = foodProductUpdateService;
        this.fileDownloader = fileDownloader;
    }

    // updates the food products table daily at midnight
    // @Scheduled(cron = "0 0 0 * * ?")
    // @PostConstruct
    public void updateFoodProducts() {
        System.out.println("Updating the food products table");
        try {
            fileDownloader.updateFoodProductDump();
            System.out.println("Finished updating the food products file");
        } catch (InterruptedException | IOException exception) {
            System.out.println("Unable to update food products file");
            exception.printStackTrace();
        }
        foodProductPopulationService.writeFoodProductCSV();
        foodProductUpdateService.updateFoodProductsFromStagingTable();
    }
}
