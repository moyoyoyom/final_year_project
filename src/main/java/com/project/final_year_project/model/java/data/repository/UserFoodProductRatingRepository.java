package com.project.final_year_project.model.java.data.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.final_year_project.model.java.UserFoodProductRating;
import com.project.final_year_project.model.java.UserFoodProductRatingID;

@Repository
public interface UserFoodProductRatingRepository extends JpaRepository<UserFoodProductRating, UserFoodProductRatingID> {
    List<UserFoodProductRating> findByUserUserID(Long userID);

}
