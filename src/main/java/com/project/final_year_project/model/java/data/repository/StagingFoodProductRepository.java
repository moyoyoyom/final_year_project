package com.project.final_year_project.model.java.data.repository;

import java.util.stream.Stream;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.final_year_project.model.java.StagingFoodProduct;

@Repository
public interface StagingFoodProductRepository extends JpaRepository<StagingFoodProduct, String> {
    @Query("SELECT s FROM StagingFoodProduct s")
    Stream<StagingFoodProduct> streamAll();
}
