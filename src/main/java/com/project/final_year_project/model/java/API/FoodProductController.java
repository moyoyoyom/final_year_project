package com.project.final_year_project.model.java.API;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.final_year_project.model.java.FoodProduct;

@RestController
@RequestMapping("/api/foodproducts")
public class FoodProductController {

    @GetMapping("/{barcode}")
    public ResponseEntity<?> getFoodProductByBarcode(@PathVariable String barcode) {
        String foodProductUrl = "https://world.openfoodfacts.org/api/v0/product/" + barcode;
        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(foodProductUrl, String.class);
            String data = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode product = objectMapper.readTree(data);

            if (product.path("status").asInt() == 1) {
                JsonNode productInformation = product.path("product");
                JsonNode nutritionalInformation = product.path("nutriments");

                String productName = productInformation.path("product_name").asText();
                String ingredients = productInformation.path("ingredients_text").asText();

                String carbohydratesPer100g = nutritionalInformation.path("carbohydrates_100g").asText();
                String energyPer100g = nutritionalInformation.path("energy-kcal_100g").asText();
                String fatPer100g = nutritionalInformation.path("fat_100g").asText();
                String fiberPer100g = nutritionalInformation.path("fiber_100g").asText();
                String proteinsPer100g = nutritionalInformation.path("proteins_100g").asText();
                String saltPer100g = nutritionalInformation.path("salt_100g").asText();
                String saturatedFatPer100g = nutritionalInformation.path("saturated-fat_100g").asText();
                String sodiumPer100g = nutritionalInformation.path("sodium_100g").asText();
                String sugarsPer100g = nutritionalInformation.path("sugars_100g").asText();

                Map<String, String> nutritionalInformationMap = Map.of("carbohydratesPer100g", carbohydratesPer100g,
                        "energyPer100g", energyPer100g,
                        "fatPer100g", fatPer100g,
                        "fiberPer100g", fiberPer100g,
                        "proteinsPer100g", proteinsPer100g,
                        "saltPer100g", saltPer100g,
                        "saturatedFatPer100g", saturatedFatPer100g,
                        "sodiumPer100g", sodiumPer100g,
                        "sugarsPer100g", sugarsPer100g);

                return ResponseEntity
                        .ok(new FoodProduct(barcode, productName, ingredients, nutritionalInformationMap));
            }
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(barcode);
    }
}
