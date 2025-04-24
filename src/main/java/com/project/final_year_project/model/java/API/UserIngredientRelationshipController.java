package com.project.final_year_project.model.java.API;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.final_year_project.model.java.FoodTrigger;
import com.project.final_year_project.model.java.UserIngredientRelationship;
import com.project.final_year_project.model.java.service.UserIngredientRelationshipService;

@Controller
@RequestMapping("/api/relationships")
public class UserIngredientRelationshipController {
    private final UserIngredientRelationshipService userIngredientRelationshipService;

    @Autowired
    public UserIngredientRelationshipController(UserIngredientRelationshipService userIngredientRelationshipService) {
        this.userIngredientRelationshipService = userIngredientRelationshipService;
    }

    @PostMapping("/save")
    public ResponseEntity<UserIngredientRelationship> saveRelationship(
            @RequestBody UserIngredientRelationship userIngredientRelationship) {
        UserIngredientRelationship relationship = userIngredientRelationshipService
                .saveUserSensitivities(userIngredientRelationship);
        return ResponseEntity.ok(relationship);
    }

    @GetMapping("/{relationship}/{userID}")
    public ResponseEntity<List<FoodTrigger>> getAllUserSensitivities(@PathVariable("userID") Long userID,
            @PathVariable("relationship") String relationship) {
        List<FoodTrigger> foodTriggers = userIngredientRelationshipService.getAllUserSensitivities(userID,
                relationship);
        return ResponseEntity.ok(foodTriggers);
    }

}
