package com.project.final_year_project.model.java;

import java.util.Map;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "FoodProducts")
public class FoodProduct {
    @Id
    private String code;
    @Column
    private String productName;
    @Column
    private String ingredientsText;
    @Column
    private Integer energyPer100g;
    @Column
    private Integer fatPer100g;
    @Column
    private Integer fiberPer100g;
    @Column
    private Integer proteinsPer100g;
    @Column
    private Integer saltPer100g;
    @Column
    private Integer saturatedFatPer100g;
    @Column
    private Integer sodiumPer100g;
    @Column
    private Integer sugarsPer100g;

    public FoodProduct(String code, String productName, String ingredientsText) {
        this.code = code;
        this.productName = productName;
        this.ingredientsText = ingredientsText;
    }

    public FoodProduct(String code, String productName, String ingredientsText,
            Map<String, String> nutritionalInformation) {
        this.code = code;
        this.productName = productName;
        this.ingredientsText = ingredientsText;
        this.energyPer100g = Integer.valueOf(nutritionalInformation.get("energyPer100g"));
        this.fatPer100g = Integer.valueOf(nutritionalInformation.get("fatPer100g"));
        this.fiberPer100g = Integer.valueOf(nutritionalInformation.get("fiberPer100g"));
        this.proteinsPer100g = Integer.valueOf(nutritionalInformation.get("proteinsPer100g"));
        this.saltPer100g = Integer.valueOf(nutritionalInformation.get("saltPer100g"));
        this.saturatedFatPer100g = Integer.valueOf(nutritionalInformation.get("saturatedFatPer100g"));
        this.sodiumPer100g = Integer.valueOf(nutritionalInformation.get("sodiumPer100g"));
        this.sugarsPer100g = Integer.valueOf(nutritionalInformation.get("sugarsPer100g"));
    }
}
