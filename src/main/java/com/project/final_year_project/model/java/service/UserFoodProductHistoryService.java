package com.project.final_year_project.model.java.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.final_year_project.model.java.FoodProduct;
import com.project.final_year_project.model.java.User;
import com.project.final_year_project.model.java.UserFoodProductHistory;
import com.project.final_year_project.model.java.UserFoodProductHistoryID;
import com.project.final_year_project.model.java.data.repository.UserFoodProductHistoryRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class UserFoodProductHistoryService {
    @PersistenceContext
    private EntityManager entityManager;

    private final UserFoodProductHistoryRepository userFoodProductHistoryRepository;

    public UserFoodProductHistoryService(UserFoodProductHistoryRepository userFoodProductHistoryRepository) {
        this.userFoodProductHistoryRepository = userFoodProductHistoryRepository;
    }

    public UserFoodProductHistory saveUserFoodProductViewing(UserFoodProductHistory userFoodProductHistory) {
        Long userID = userFoodProductHistory.getUser().getUserID();
        String code = userFoodProductHistory.getFoodProduct().getCode();
        UserFoodProductHistoryID viewingID = new UserFoodProductHistoryID(userID, code);
        Optional<UserFoodProductHistory> viewedFoodProduct = userFoodProductHistoryRepository.findById(viewingID);

        if (viewedFoodProduct.isPresent()) {
            UserFoodProductHistory viewingHistory = viewedFoodProduct.get();
            viewingHistory.setDateTimeViewed(LocalDateTime.now());
            userFoodProductHistoryRepository.save(viewingHistory);
            return viewingHistory;
        } else {
            User user = entityManager.getReference(User.class, userID);
            FoodProduct foodProduct = userFoodProductHistory.getFoodProduct();
            UserFoodProductHistory viewingHistory = new UserFoodProductHistory(user, foodProduct, LocalDateTime.now());
            userFoodProductHistoryRepository.save(viewingHistory);
            return viewingHistory;
        }
    }

    public List<UserFoodProductHistory> getRecentFoodProductHistory(Long userID) {
        User user = entityManager.getReference(User.class, userID);
        Pageable pageable = PageRequest.of(0, 20);
        return userFoodProductHistoryRepository.findRecentViewsByUserByDateTimeViewed(user, pageable);
    }

}
