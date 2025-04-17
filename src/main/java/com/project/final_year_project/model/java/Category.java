package com.project.final_year_project.model.java;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryID;

    @Column(unique = true)
    private String categoryText;

    @ManyToMany(mappedBy = "categories")
    @JsonIgnore
    private List<FoodProduct> categories;

    public Category(String categoryText) {
        this.categoryText = categoryText;
    }

    @JsonCreator
    public static Category fromString(String categoryText) {
        return new Category(categoryText);
    }
}
