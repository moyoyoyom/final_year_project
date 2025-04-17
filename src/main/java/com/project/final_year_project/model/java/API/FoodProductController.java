package com.project.final_year_project.model.java.API;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.final_year_project.model.java.FoodProduct;
import com.project.final_year_project.model.java.service.FoodProductService;

@RestController
@RequestMapping("/api/foodproducts")
public class FoodProductController {
    private final FoodProductService foodProductService;

    @Autowired
    public FoodProductController(FoodProductService foodProductService) {
        this.foodProductService = foodProductService;
    }

    @GetMapping("barcode/{barcode}")
    public FoodProduct getFoodProductByBarcode(@PathVariable("barcode") String barcode) {
        return foodProductService.getFoodProductByBarcode(barcode);
    }

    @GetMapping("recommendations/{userID}")
    public ResponseEntity<List<FoodProduct>> getUserFoodProductRecommendations(@PathVariable("userID") Long userID) {
        return ResponseEntity.ok(foodProductService.getUserRecommendations(userID), 10);
    }
}
