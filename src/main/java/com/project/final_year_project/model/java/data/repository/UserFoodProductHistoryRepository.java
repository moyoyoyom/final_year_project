package com.project.final_year_project.model.java.data.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.final_year_project.model.java.User;
import com.project.final_year_project.model.java.UserFoodProductHistory;
import com.project.final_year_project.model.java.UserFoodProductHistoryID;

@Repository
public interface UserFoodProductHistoryRepository
                extends JpaRepository<UserFoodProductHistory, UserFoodProductHistoryID> {
        @Query("SELECT u FROM UserFoodProductHistory u WHERE u.user = :user ORDER BY u.dateTimeViewed DESC")
        List<UserFoodProductHistory> findRecentViewsByUserByDateTimeViewed(@Param("user") User user,
                        Pageable pageable);

}
