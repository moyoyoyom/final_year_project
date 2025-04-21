package com.project.final_year_project.model.java.data.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.final_year_project.model.java.FoodProduct;

@Repository
public interface FoodProductRepository extends JpaRepository<FoodProduct, String> {
    Optional<FoodProduct> findByCode(String id);

    @Query("SELECT f.code FROM FoodProduct f")
    Set<String> findAllCodes();
}
