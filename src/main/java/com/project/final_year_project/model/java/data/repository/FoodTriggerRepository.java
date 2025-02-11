package com.project.final_year_project.model.java.data.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.final_year_project.model.java.FoodTrigger;

@Repository
public interface FoodTriggerRepository extends JpaRepository<FoodTrigger, Integer> {
    @EntityGraph(attributePaths = "foodGroup")
    List<FoodTrigger> findAllByFetchFoodGroup();
}
