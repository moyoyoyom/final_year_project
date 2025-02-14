package com.project.final_year_project.model.java;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
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

    @Enumerated(EnumType.STRING)
    @Column
    private Relationship relationship;

    public UserIngredientRelationship(User user, FoodTrigger foodTrigger, Relationship relationship) {
        this.user = user;
        this.foodTrigger = foodTrigger;
        this.userIngredientRelationshipID = new UserIngredientRelationshipID(user.getUserID(),
                foodTrigger.getFoodGroupID());
        this.relationship = relationship;
    }
}
