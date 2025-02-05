package com.project.final_year_project.model.java.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.final_year_project.model.java.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * 
     * @param username username stored in the database
     * @return a User associated with the username if there is any
     */
    User findByUsername(String username);
}
