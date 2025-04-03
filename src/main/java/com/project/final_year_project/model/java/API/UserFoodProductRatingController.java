package com.project.final_year_project.model.java.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.final_year_project.model.java.UserFoodProductRating;
import com.project.final_year_project.model.java.service.UserFoodProductRatingService;

@Controller
@RequestMapping("api/rating")
public class UserFoodProductRatingController {
    private final UserFoodProductRatingService userFoodProductRatingService;

    @Autowired
    public UserFoodProductRatingController(UserFoodProductRatingService userFoodProductRatingService) {
        this.userFoodProductRatingService = userFoodProductRatingService;
    }

    @PostMapping("/save")
    public ResponseEntity<UserFoodProductRating> saveRating(@RequestBody UserFoodProductRating userFoodProductRating) {
        UserFoodProductRating rating = userFoodProductRatingService.saveUserFoodProductRating(userFoodProductRating);
        return ResponseEntity.ok(rating);
    }
}
