package com.project.final_year_project.model.java.API;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.project.final_year_project.model.java.FoodProduct;

import java.util.Arrays;
import java.util.List;

public class API {
    public List<FoodProduct> fetchFoodProducts(String query) {
        RestTemplate restTemplate = new RestTemplate();
        String requestEndpoint = "https://world.openfoodfacts.org/api/v2/search" + query;

        ResponseEntity<FoodProduct[]> apiResponse = restTemplate.getForEntity(requestEndpoint, FoodProduct[].class);
        return Arrays.asList(apiResponse.getBody());

    }
}
