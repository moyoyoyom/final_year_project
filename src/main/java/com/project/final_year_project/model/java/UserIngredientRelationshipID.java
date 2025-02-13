package com.project.final_year_project.model.java;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
public class UserIngredientRelationshipID implements Serializable {
    @Column
    private Long userID;

    @Column
    private Integer foodTriggerID;

    public UserIngredientRelationshipID(Long userID, Integer foodTriggerID) {
        this.userID = userID;
        this.foodTriggerID = foodTriggerID;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userID, foodTriggerID);
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (object == null || getClass() != object.getClass()) {
            return false;
        }
        UserIngredientRelationshipID comparedObject = (UserIngredientRelationshipID) object;
        return Objects.equals(userID, comparedObject.userID)
                && Objects.equals(foodTriggerID, comparedObject.foodTriggerID);
    }
}
