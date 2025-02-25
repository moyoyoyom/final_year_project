package com.project.final_year_project.model.java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.final_year_project.model.java.FoodProduct;
import com.project.final_year_project.model.java.FoodProductResponse;

@Service
public class FoodProductService {
    private final RestTemplate restTemplate;

    @Autowired
    public FoodProductService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public FoodProduct getFoodProductByBarcode(String barcode) {
        String foodProductUrl = "https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json";
        FoodProductResponse response = restTemplate.getForObject(foodProductUrl, FoodProductResponse.class);
        return (response != null) ? response.getFoodProduct() : null;
    }
}
