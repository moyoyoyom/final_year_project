package com.project.final_year_project.model.java.API;

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
            JsonNode jsonNode = objectMapper.readTree(data);

            if (jsonNode.path("status").asInt() == 1) {
                JsonNode productInformation = jsonNode.path("product");
                String productName = productInformation.path("product_name").asText();
                String ingredients = productInformation.path("ingredients_text").asText();

                return ResponseEntity
                        .ok(new FoodProduct(barcode, foodProductUrl, foodProductUrl, data));
            }
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(barcode);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(barcode);
    }
}
