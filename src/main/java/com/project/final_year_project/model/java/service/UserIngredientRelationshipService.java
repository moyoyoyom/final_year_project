package com.project.final_year_project.model.java.service;

import org.springframework.stereotype.Service;

import com.project.final_year_project.model.java.UserIngredientRelationship;
import com.project.final_year_project.model.java.data.repository.UserIngredientRelationshipRepository;

@Service
public class UserIngredientRelationshipService {
    private final UserIngredientRelationshipRepository userIngredientRelationshipRepository;

    public UserIngredientRelationshipService(
            UserIngredientRelationshipRepository userIngredientRelationshipRepository) {
        this.userIngredientRelationshipRepository = userIngredientRelationshipRepository;
    }

    public UserIngredientRelationship saveUserSensitivities(UserIngredientRelationship userIngredientRelationship) {
        return userIngredientRelationshipRepository.save(userIngredientRelationship);
    }
}
