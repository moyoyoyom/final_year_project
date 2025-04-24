package com.project.final_year_project.model.java.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.final_year_project.model.java.FoodTrigger;
import com.project.final_year_project.model.java.Relationship;
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

    public List<FoodTrigger> getAllUserSensitivities(Long userID, String specifiedRelationship) {
        List<UserIngredientRelationship> userIngredientRelationships = userIngredientRelationshipRepository
                .findByUserUserID(userID);
        return userIngredientRelationships.stream()
                .filter(relationship -> relationship
                        .getRelationship() == getRelationshipFromString(specifiedRelationship))
                .map(UserIngredientRelationship::getFoodTrigger)
                .collect(Collectors.toList());
    }

    public Relationship getRelationshipFromString(String relationship) {
        if (relationship.equalsIgnoreCase("CANNOTEAT")) {
            return Relationship.CANNOTEAT;
        } else if (relationship.equalsIgnoreCase("DISLIKES")) {
            return Relationship.DISLIKES;
        }
        return Relationship.NONE;
    }
}
