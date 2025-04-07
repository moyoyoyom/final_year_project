package com.project.final_year_project.model.java.data.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.final_year_project.model.java.FoodProduct;

public interface FoodProductRepository extends JpaRepository<FoodProduct, String> {
    Optional<FoodProduct> findByCode(String id);
}
