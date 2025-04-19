package com.project.final_year_project.model.java.service;

import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opencsv.CSVReader;
import com.project.final_year_project.model.java.StagingFoodProduct;
import com.project.final_year_project.model.java.data.repository.StagingFoodProductRepository;

@Service
public class StagingFoodProductService {
    private final StagingFoodProductRepository stagingFoodProductRepository;

    @Autowired
    public StagingFoodProductService(StagingFoodProductRepository stagingFoodProductRepository) {
        this.stagingFoodProductRepository = stagingFoodProductRepository;
    }

    public void populateTableWithCSV(String foodProductsCSVPath) {
        try (
                Reader reader = Files.newBufferedReader(Paths.get(foodProductsCSVPath));
                CSVReader csvReader = new CSVReader(reader);) {

            System.out.println("Starting to populate the Staging Food Product Table");
            String[] nextFoodProductLine;
            int linesRead = 0;

            List<StagingFoodProduct> stagedFoodProductBatch = new ArrayList<>();

            while ((nextFoodProductLine = csvReader.readNext()) != null) {
                if (linesRead != 0) {
                    StagingFoodProduct stagedFoodProduct = new StagingFoodProduct();

                    stagedFoodProduct.setCode(nextFoodProductLine[0]);
                    stagedFoodProduct.setBrands(nextFoodProductLine[1]);
                    stagedFoodProduct.setImageUrl(nextFoodProductLine[2]);
                    stagedFoodProduct.setIngredientsText(nextFoodProductLine[3]);
                    stagedFoodProduct.setKeywords(nextFoodProductLine[4]);
                    stagedFoodProduct.setNutrtionalInformation(nextFoodProductLine[5]);
                    stagedFoodProduct.setProductName(nextFoodProductLine[6]);
                    stagedFoodProduct.setQuantity(nextFoodProductLine[7]);
                    stagedFoodProduct.setQuantity(nextFoodProductLine[8]);

                    stagedFoodProductBatch.add(stagedFoodProduct);

                    if (stagedFoodProductBatch.size() >= 1000) {
                        stagingFoodProductRepository.saveAll(stagedFoodProductBatch);
                        stagedFoodProductBatch.clear();
                    }
                }
                linesRead++;
                System.out.println(linesRead);
            }

            if (!stagedFoodProductBatch.isEmpty()) {
                linesRead += stagedFoodProductBatch.size();
                stagingFoodProductRepository.saveAll(stagedFoodProductBatch);
                stagedFoodProductBatch.clear();
            }

            System.out.println("Staged " + linesRead + "food products");
        } catch (Exception exception) {
            System.out.println("There was a problem populating the staging food products table");
            exception.printStackTrace();
        }
    }
}
