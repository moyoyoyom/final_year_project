package com.project.final_year_project.model.java;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
// @Entity
// @Table(name = "FoodProducts")
public class FoodProduct {

    @JsonProperty("code")
    private String code;

    @JsonProperty("product_name")
    private String productName;

    @JsonProperty("ingredients_text")
    private String ingredientsText;

    @JsonProperty("nutriments")
    private NutritionalInformation nutritionalInformation;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("quantity")
    private String quantity;

    @JsonProperty("brands")
    private String brands;
}
