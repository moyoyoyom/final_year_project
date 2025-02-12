package com.project.final_year_project.model.java.API;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.final_year_project.model.java.FoodTrigger;
import com.project.final_year_project.model.java.service.FoodTriggerService;

@RestController
@RequestMapping("/api/foodtriggers")
public class FoodTriggerController {
    private final FoodTriggerService foodTriggerService;

    @Autowired
    public FoodTriggerController(FoodTriggerService foodTriggerService) {
        this.foodTriggerService = foodTriggerService;
    }

    @GetMapping("/getallbygroups")
    public ResponseEntity<List<FoodTrigger>> getAllFoodTriggersByFoodGroup() {
        return ResponseEntity.ok(foodTriggerService.getAllTriggersByFoodGroups());
    }
}
