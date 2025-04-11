package com.project.final_year_project.model.java.API;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.final_year_project.model.java.UserFoodProductHistory;
import com.project.final_year_project.model.java.service.UserFoodProductHistoryService;

@RestController
@RequestMapping("api/history")
public class UserFoodProductHistoryController {
    private final UserFoodProductHistoryService userFoodProductHistoryService;

    @Autowired
    public UserFoodProductHistoryController(UserFoodProductHistoryService userFoodProductHistoryService) {
        this.userFoodProductHistoryService = userFoodProductHistoryService;
    }

    @PostMapping(value = "/save")
    public ResponseEntity<UserFoodProductHistory> recordUserViewing(
            @RequestBody UserFoodProductHistory userFoodProductHistory) {
        UserFoodProductHistory savedViewing = userFoodProductHistoryService
                .saveUserFoodProductViewing(userFoodProductHistory);
        return ResponseEntity.ok(savedViewing);
    }

    @GetMapping("/recent/{userID}")
    public ResponseEntity<List<UserFoodProductHistory>> getRecentlyViewedFoodProducts(
            @PathVariable("userID") Long userID) {
        List<UserFoodProductHistory> recentlyViewed = userFoodProductHistoryService.getRecentFoodProductHistory(userID);
        return ResponseEntity.ok(recentlyViewed);
    }
}
