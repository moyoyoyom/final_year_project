package com.project.final_year_project.model.java;

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
@Entity
@NoArgsConstructor
@Table(name = "UserIngredientRelationships", schema = "gourmet_buddy_schema")
public class UserIngredientRelationship {
    @EmbeddedId
    private UserIngredientRelationshipID userIngredientRelationshipID;

    @ManyToOne
    @MapsId("userID")
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @MapsId("foodTriggerID")
    @JoinColumn(name = "foodTriggerID")
    private FoodTrigger foodTrigger;

    public UserIngredientRelationship(User user, FoodTrigger foodTrigger) {
        this.user = user;
        this.foodTrigger = foodTrigger;
        this.userIngredientRelationshipID = new UserIngredientRelationshipID(user.getUserID(),
                foodTrigger.getFoodGroupID());
    }
}
