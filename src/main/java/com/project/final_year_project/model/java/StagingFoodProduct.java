package com.project.final_year_project.model.java;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Table(name = "StagingFoodProduct")
@Getter
@Setter
public class StagingFoodProduct {
    @Id
    private String code;

    @Column
    private String brands;

    @Column
    private String imageUrl;

    @Column
    private String ingredientsText;

    @Column
    private String keywords;

    @Column
    private String nutrtionalInformation;

    @Column
    private String productName;

    @Column
    private String quantity;

    @Column
    private String categories;
}
