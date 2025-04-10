package com.project.final_year_project.model.java.API;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.final_year_project.model.java.Rating;
import com.project.final_year_project.model.java.UserFoodProductRating;
import com.project.final_year_project.model.java.UserFoodProductRatingID;
import com.project.final_year_project.model.java.service.UserFoodProductRatingService;

@Controller
@RequestMapping("api/rating")
public class UserFoodProductRatingController {
    private final UserFoodProductRatingService userFoodProductRatingService;

    @Autowired
    public UserFoodProductRatingController(UserFoodProductRatingService userFoodProductRatingService) {
        this.userFoodProductRatingService = userFoodProductRatingService;
    }

    @PostMapping("/save/{relationship}")
    public ResponseEntity<UserFoodProductRating> saveRating(@RequestBody UserFoodProductRating userFoodProductRating,
            @PathVariable("relationship") String relationship) {
        UserFoodProductRating rating = userFoodProductRatingService.saveUserFoodProductRating(userFoodProductRating,
                relationship);
        return ResponseEntity.ok(rating);
    }

    @GetMapping("/{userID}/{code}/{relationship}")
    public ResponseEntity<UserFoodProductRating> getFoodProductRating(@PathVariable("userID") Long userID,
            @PathVariable("code") String code, @PathVariable("relationship") String relationship) {
        UserFoodProductRatingID defaultID = new UserFoodProductRatingID(userID, code, Rating.NONE);
        UserFoodProductRating defaultUserFoodProductRating = new UserFoodProductRating();
        defaultUserFoodProductRating.setUserFoodProductRatingID(defaultID);
        Optional<UserFoodProductRating> rating = userFoodProductRatingService.getUsersFoodProductRating(userID, code,
                relationship);
        if (rating.isPresent())
            return ResponseEntity.ok(rating.get());
        return ResponseEntity.ok(defaultUserFoodProductRating);
    }

    @DeleteMapping("/{userID}/{code}/{relationship}")
    public ResponseEntity<?> deleteFoodProductRating(@PathVariable("userID") Long userID,
            @PathVariable("code") String code, @PathVariable("relationship") String relationship) {
        boolean hasRatingBeenRemoved = userFoodProductRatingService.removeRating(userID, code, relationship);

        return hasRatingBeenRemoved ? (ResponseEntity.ok("Rating has been removed"))
                : (ResponseEntity.status(HttpStatus.NOT_FOUND).body("Currently unable to remove rating"));
    }
}
