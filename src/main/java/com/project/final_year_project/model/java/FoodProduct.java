package com.project.final_year_project.model.java;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fasterxml.jackson.annotation.JsonProperty;

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
@Table(name = "FoodProduct")
public class FoodProduct {
    @Id
    @Column
    @JsonProperty("code")
    private Integer code;

    @JsonProperty("product_name")
    @Column
    private String productName;

    @JsonProperty("ingredients_text")
    @Column
    private String ingredientsText;

    @JsonProperty("nutriments")
    @Column
    @JdbcTypeCode(SqlTypes.JSON)
    private NutritionalInformation nutritionalInformation;

    @JsonProperty("image_url")
    @Column
    private String imageUrl;

    @JsonProperty("quantity")
    @Column
    private String quantity;

    @JsonProperty("brands")
    @Column
    private String brands;
}
