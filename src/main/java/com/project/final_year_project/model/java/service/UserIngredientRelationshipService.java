package com.project.final_year_project.model.java.service;

import org.springframework.stereotype.Service;

import com.project.final_year_project.model.java.User;
import com.project.final_year_project.model.java.UserIngredientRelationship;
import com.project.final_year_project.model.java.data.repository.UserIngredientRelationshipRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class UserIngredientRelationshipService {
    @PersistenceContext
    private EntityManager entityManager;

    private final UserIngredientRelationshipRepository userIngredientRelationshipRepository;

    public UserIngredientRelationshipService(
            UserIngredientRelationshipRepository userIngredientRelationshipRepository) {
        this.userIngredientRelationshipRepository = userIngredientRelationshipRepository;
    }

    public UserIngredientRelationship saveUserSensitivities(UserIngredientRelationship userIngredientRelationship) {
        Long userID = userIngredientRelationship.getUser().getUserID();
        User user = entityManager.getReference(User.class, userID);
        userIngredientRelationship.setUser(user);
        return userIngredientRelationshipRepository.save(userIngredientRelationship);
    }
}
