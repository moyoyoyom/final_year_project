package com.project.final_year_project.model.java;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
@Table(name = "UserFoodProductRating", schema = "gourmet_buddy_schema")
public class UserFoodProductRating {
    @EmbeddedId
    private UserFoodProductRatingID userFoodProductRatingID;

    @ManyToOne
    @MapsId("userID")
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @MapsId("code")
    @JoinColumn(name = "code")
    private FoodProduct foodProduct;

    public UserFoodProductRating(
            @JsonProperty("user") User user,
            @JsonProperty("foodProduct") FoodProduct foodProduct) {
        this.user = user;
        this.foodProduct = foodProduct;
        this.userFoodProductRatingID = new UserFoodProductRatingID(user.getUserID(), foodProduct.getCode(),
                Rating.NONE);
    }
}
