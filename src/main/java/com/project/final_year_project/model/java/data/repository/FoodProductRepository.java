package com.project.final_year_project.model.java.data.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.final_year_project.model.java.FoodProduct;

@Repository
public interface FoodProductRepository extends JpaRepository<FoodProduct, String> {
    Optional<FoodProduct> findByCode(String id);

    @Query("SELECT f.code FROM FoodProduct f")
    Set<String> findAllCodes();

    @Query("SELECT f FROM FoodProduct f JOIN f.keywords k WHERE k.keywordText IN :keywordNames AND f.code NOT IN :excludedIDs")
    List<FoodProduct> findRecommendations(@Param("keywordNames") Set<String> mostCommonKeywords,
            @Param("excludedIDs") Set<String> userFoodProductRatingIDs);

    @Query("SELECT f FROM FoodProduct f ORDER BY function('RAND')")
    List<FoodProduct> getRandomFoodProducts(Pageable pageable);
}
