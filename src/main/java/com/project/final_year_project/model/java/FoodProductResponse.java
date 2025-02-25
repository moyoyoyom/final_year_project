package com.project.final_year_project.model.java;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodProductResponse {
    @JsonProperty("product")
    private FoodProduct foodProduct;
}
