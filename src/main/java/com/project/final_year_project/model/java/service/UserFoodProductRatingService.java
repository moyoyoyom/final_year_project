package com.project.final_year_project.model.java.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.final_year_project.model.java.Rating;
import com.project.final_year_project.model.java.User;
import com.project.final_year_project.model.java.UserFoodProductRating;
import com.project.final_year_project.model.java.UserFoodProductRatingID;
import com.project.final_year_project.model.java.data.repository.UserFoodProductRatingRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class UserFoodProductRatingService {
    @PersistenceContext
    private EntityManager entityManager;

    private final UserFoodProductRatingRepository userFoodProductRatingRepository;

    public UserFoodProductRatingService(UserFoodProductRatingRepository userFoodProductRatingRepository) {
        this.userFoodProductRatingRepository = userFoodProductRatingRepository;
    }

    public UserFoodProductRating saveUserFoodProductRating(UserFoodProductRating userFoodProductRating) {
        Long userID = userFoodProductRating.getUser().getUserID();
        User user = entityManager.getReference(User.class, userID);
        userFoodProductRating.setUser(user);
        return userFoodProductRatingRepository.save(userFoodProductRating);
    }

    public Optional<UserFoodProductRating> getUsersFoodProductRating(Long userID, String code, Rating rating) {
        UserFoodProductRatingID userFoodProductRatingID = new UserFoodProductRatingID(userID, code, rating);
        return userFoodProductRatingRepository.findById(userFoodProductRatingID);
    }
}
