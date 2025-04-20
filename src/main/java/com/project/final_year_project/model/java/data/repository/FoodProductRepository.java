package com.project.final_year_project.model.java.data.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.final_year_project.model.java.FoodProduct;

@Repository
public interface FoodProductRepository extends JpaRepository<FoodProduct, String> {
    Optional<FoodProduct> findByCode(String id);

    @Query("SELECT f FROM FoodProduct f JOIN f.categories c WHERE c.categoryText IN :categories AND f.code NOT IN :currentIDs")
    List<FoodProduct> findRelevantFoodProducts(@Param("categories") Set<String> categories,
            @Param("currentIDs") Set<String> currentIDs);

    @Query("SELECT f.code FROM FoodProduct f")
    Set<String> findAllCodes();
}
