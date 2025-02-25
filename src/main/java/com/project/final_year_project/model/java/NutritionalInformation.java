package com.project.final_year_project.model.java;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NutritionalInformation {
    @JsonProperty("carbohydrates_100g")
    private Double carbohydratesPer100g;
    @JsonProperty("energy-kcal")
    private Double caloriesPer100g;
    @JsonProperty("energy-kj")
    private Double energyKJPer100g;
    @JsonProperty("fat_100g")
    private Double fatPer100g;
    @JsonProperty("fiber_100g")
    private Double fiberPer100g;
    @JsonProperty("proteins_100g")
    private Double proteinsPer100g;
    @JsonProperty("salt_100g")
    private Double saltPer100g;
    @JsonProperty("saturated-fat_100g")
    private Double saturatedFatPer100g;
    @JsonProperty("sodium_100g")
    private Double sodiumPer100g;
    @JsonProperty("sugars_100g")
    private Double sugarsPer100g;
}
