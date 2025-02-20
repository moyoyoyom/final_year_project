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
    private String energyPer100g;
    @Column
    private String fatPer100g;
    @Column
    private String fiberPer100g;
    @Column
    private String proteinsPer100g;
    @Column
    private String saltPer100g;
    @Column
    private String saturatedFatPer100g;
    @Column
    private String sodiumPer100g;
    @Column
    private String sugarsPer100g;

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
        this.energyPer100g = nutritionalInformation.get("energyPer100g");
        this.fatPer100g = nutritionalInformation.get("fatPer100g");
        this.fiberPer100g = nutritionalInformation.get("fiberPer100g");
        this.proteinsPer100g = nutritionalInformation.get("proteinsPer100g");
        this.saltPer100g = nutritionalInformation.get("saltPer100g");
        this.saturatedFatPer100g = nutritionalInformation.get("saturatedFatPer100g");
        this.sodiumPer100g = nutritionalInformation.get("sodiumPer100g");
        this.sugarsPer100g = nutritionalInformation.get("sugarsPer100g");
    }
}
