package com.project.final_year_project.model.java.API;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.final_year_project.model.java.Rating;
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

    @GetMapping("/{userID}/{code}")
    public ResponseEntity<UserFoodProductRating> getFoodProductRating(@PathVariable("userID") Long userID,
            @PathVariable("code") String code) {
        Optional<UserFoodProductRating> rating = userFoodProductRatingService.getUsersFoodProductRating(userID, code,
                Rating.LIKED);
        if (rating.isPresent())
            return ResponseEntity.ok(rating.get());
        return ResponseEntity.ok(null);
    }
}
