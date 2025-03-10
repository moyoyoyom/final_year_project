package com.project.final_year_project.model.java.data.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.final_year_project.model.java.UserIngredientRelationship;
import com.project.final_year_project.model.java.UserIngredientRelationshipID;

@Repository
public interface UserIngredientRelationshipRepository
                extends JpaRepository<UserIngredientRelationship, UserIngredientRelationshipID> {
        List<UserIngredientRelationship> findByUserUserID(Long userID);
}
