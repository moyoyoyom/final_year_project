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

    @Column(columnDefinition = "TEXT")
    private String brands;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String ingredientsText;

    @Column(columnDefinition = "TEXT")
    private String keywords;

    @Column(columnDefinition = "TEXT")
    private String nutritionalInformation;

    @Column(columnDefinition = "TEXT")
    private String productName;

    @Column(columnDefinition = "TEXT")
    private String quantity;
}
