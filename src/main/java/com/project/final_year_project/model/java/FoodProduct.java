package com.project.final_year_project.model.java;

import java.util.List;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Data
@Entity
@Table(name = "FoodProduct")
public class FoodProduct {
    @Id
    @Column
    @JsonProperty("code")
    private String code;

    @JsonProperty("product_name")
    @Column
    private String productName;

    @JsonProperty("ingredients_text")
    @Column(length = 800)
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

    @JsonProperty("_keywords")
    @ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinTable(name = "FoodProductKeyword", joinColumns = @JoinColumn(name = "code"), inverseJoinColumns = @JoinColumn(name = "keywordID"))
    @Column
    private List<Keyword> keywords;

    @JsonProperty("categories_hierarchy")
    @ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinTable(name = "FoodProductCategory", joinColumns = @JoinColumn(name = "code"), inverseJoinColumns = @JoinColumn(name = "categoryID"))
    @Column
    private List<Category> categories;

    public FoodProduct(String code, String productName, String ingredientsText,
            NutritionalInformation nutritionalInformation, String imageURL, String quantity, String brands,
            List<Category> categories) {
        this.code = code;
        this.productName = productName;
        this.ingredientsText = ingredientsText;
        this.nutritionalInformation = nutritionalInformation;
        this.imageUrl = imageURL;
        this.quantity = quantity;
        this.brands = brands;
        this.categories = categories;
    }
}
