package com.project.final_year_project.model.java;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "FoodTriggers")
public class FoodTrigger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodTriggerID;

    @Column(nullable = false)
    private String triggerName;

    @ManyToOne
    @JoinColumn(name = "foodGroupID")
    private FoodGroup foodGroup;

    public FoodTrigger(Integer foodTriggerID, String triggerName, FoodGroup foodGroup) {
        this.foodTriggerID = foodTriggerID;
        this.triggerName = triggerName;
        this.foodGroup = foodGroup;
    }

    public Integer getFoodTriggerID() {
        return foodTriggerID;
    }

    public void setFoodTriggerID(Integer foodTriggerID) {
        this.foodTriggerID = foodTriggerID;
    }

    public String getTriggerName() {
        return triggerName;
    }

    public void setTriggerName(String triggerName) {
        this.triggerName = triggerName;
    }

    public FoodGroup getFoodGroup() {
        return foodGroup;
    }

    public void setFoodGroup(FoodGroup foodGroup) {
        this.foodGroup = foodGroup;
    }
}
