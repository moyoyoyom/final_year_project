package com.project.final_year_project.model.java;

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
@Table(name = "foodProducts")
public class FoodProduct {
    @Id
    private String code;
    private String productName;
    private String ingredients;
    private String quantity;

    public FoodProduct(String code, String productName, String ingredientsText,
            String quanity) {
        this.code = code;
        this.productName = productName;
        this.ingredients = ingredientsText;
        this.quantity = quanity;
    }
}
