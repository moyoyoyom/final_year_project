package com.project.final_year_project.model.java.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.final_year_project.model.java.FoodTrigger;
import com.project.final_year_project.model.java.data.repository.FoodTriggerRepository;

@Service
public class FoodTriggerService {
    private final FoodTriggerRepository foodTriggerRepository;

    public FoodTriggerService(FoodTriggerRepository foodTriggerRepository) {
        this.foodTriggerRepository = foodTriggerRepository;
    }

    public List<FoodTrigger> getAllTriggersByFoodGroups() {
        return foodTriggerRepository.findAll();
    }
}
