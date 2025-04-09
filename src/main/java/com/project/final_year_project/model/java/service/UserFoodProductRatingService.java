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

    public UserFoodProductRating saveUserFoodProductRating(UserFoodProductRating userFoodProductRating,
            String relationship) {
        Long userID = userFoodProductRating.getUser().getUserID();
        User user = entityManager.getReference(User.class, userID);
        String code = userFoodProductRating.getFoodProduct().getCode();
        UserFoodProductRatingID userFoodProductRatingID = new UserFoodProductRatingID(userID, code,
                getRatingType(relationship));

        userFoodProductRating.setUser(user);
        userFoodProductRating.setUserFoodProductRatingID(userFoodProductRatingID);
        return userFoodProductRatingRepository.save(userFoodProductRating);
    }

    public Optional<UserFoodProductRating> getUsersFoodProductRating(Long userID, String code, String relationship) {
        UserFoodProductRatingID userFoodProductRatingID = new UserFoodProductRatingID(userID, code,
                getRatingType(relationship));
        return userFoodProductRatingRepository.findById(userFoodProductRatingID);
    }

    public Rating getRatingType(String relationship) {
        Rating rating = Rating.NONE;
        if (relationship.equalsIgnoreCase("LIKED")) {
            rating = Rating.LIKED;
        } else if (relationship.equalsIgnoreCase("SAVED")) {
            rating = Rating.SAVED;
        }
        return rating;
    }
}
