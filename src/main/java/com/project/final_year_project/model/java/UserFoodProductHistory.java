package com.project.final_year_project.model.java;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
@Table(name = "UserFoodProductHistory", schema = "gourmet_buddy_schema")
public class UserFoodProductHistory {
    @EmbeddedId
    private UserFoodProductHistoryID userFoodProductHistoryID;

    @ManyToOne
    @MapsId("userID")
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @MapsId("code")
    @JoinColumn(name = "code")
    private FoodProduct foodProduct;

    @Column
    private LocalDateTime dateTimeViewed;

    public UserFoodProductHistory(User user,
            FoodProduct foodProduct, LocalDateTime dateTimeViewed) {
        this.user = user;
        this.foodProduct = foodProduct;
        this.dateTimeViewed = dateTimeViewed;
        this.userFoodProductHistoryID = new UserFoodProductHistoryID(user.getUserID(), foodProduct.getCode());
    }
}
