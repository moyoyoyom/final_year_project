package com.project.final_year_project.model.java.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.final_year_project.model.java.FoodProduct;
import com.project.final_year_project.model.java.FoodProductResponse;
import com.project.final_year_project.model.java.data.repository.FoodProductRepository;

@Service
public class FoodProductService {
    private final RestTemplate restTemplate;
    private final FoodProductRepository foodProductRepository;

    @Autowired
    public FoodProductService(RestTemplate restTemplate, FoodProductRepository foodProductRepository) {
        this.restTemplate = restTemplate;
        this.foodProductRepository = foodProductRepository;
    }

    public FoodProduct getFoodProductByBarcode(String barcode) {
        Optional<FoodProduct> cachedFoodProduct = foodProductRepository.findById(Integer.parseInt(barcode));
        if (cachedFoodProduct.isPresent()) {
            return cachedFoodProduct.get();
        }
        String foodProductUrl = "https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json";
        FoodProductResponse response = restTemplate.getForObject(foodProductUrl, FoodProductResponse.class);

        if (response != null)
            foodProductRepository.save(response.getFoodProduct());
        return (response != null) ? response.getFoodProduct() : null;
    }
}
