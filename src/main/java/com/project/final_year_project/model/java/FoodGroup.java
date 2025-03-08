package com.project.final_year_project.model.java;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = "FoodGroups")
public class FoodGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodGroupID;

    @Column(nullable = false)
    private String groupName;

    public FoodGroup(Integer foodGroupID, String groupName) {
        this.foodGroupID = foodGroupID;
        this.groupName = groupName;
    }

    // Getters and setters
    public Integer getFoodGroupID() {
        return foodGroupID;
    }

    public void setFoodGroupID(Integer foodGroupID) {
        this.foodGroupID = foodGroupID;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
}
