package com.project.final_year_project.model.java.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.final_year_project.model.java.FoodTrigger;

@Repository
public interface FoodTriggerRepository extends JpaRepository<FoodTrigger, Integer> {
}
