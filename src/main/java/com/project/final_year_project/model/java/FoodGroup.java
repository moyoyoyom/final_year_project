package com.project.final_year_project.model.java;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "FoodGroups")
public class FoodGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodGroupID;

    @Column(nullable = false)
    private String groupName;

    // @OneToMany(mappedBy = "foodGroup")
    // @JsonManagedReference
    // private List<FoodTrigger> foodTriggers;

    public FoodGroup(Integer foodGroupID, String groupName /* , List<FoodTrigger> foodTriggers */) {
        this.foodGroupID = foodGroupID;
        this.groupName = groupName;
        // this.foodTriggers = foodTriggers;
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

    /*
     * public List<FoodTrigger> getFoodTriggers() { return foodTriggers; }
     * 
     * public void setFoodTriggers(List<FoodTrigger> foodTriggers) {
     * this.foodTriggers = foodTriggers; }
     */
}
