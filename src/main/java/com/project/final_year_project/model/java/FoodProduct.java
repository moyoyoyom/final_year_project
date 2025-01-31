package com.project.final_year_project.model.java;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodProduct {
    private Integer assignedID;
    private String productID;
    private String code;
    private String productName;
    private String ingredientsText;
    private String quantity;

    public FoodProduct(Integer assignedID, String productID, String code, String productName, String ingredientsText,
            String quanity) {
        this.assignedID = assignedID;
        this.productID = productID;
        this.code = code;
        this.productName = productName;
        this.ingredientsText = ingredientsText;
        this.quantity = quanity;
    }
}
