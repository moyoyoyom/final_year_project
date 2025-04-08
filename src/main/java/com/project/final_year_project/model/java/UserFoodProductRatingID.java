package com.project.final_year_project.model.java;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@Data
@NoArgsConstructor
public class UserFoodProductRatingID implements Serializable {
    @Column(nullable = false)
    private Long userID;

    @Column(nullable = false)
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rating rating;

    public UserFoodProductRatingID(Long userID, String code, Rating rating) {
        this.userID = userID;
        this.code = code;
        this.rating = rating;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userID, code, rating);
    }

    @Override
    public boolean equals(Object object) {
        if (this == object)
            return true;
        if (object == null || getClass() != object.getClass())
            return false;

        UserFoodProductRatingID comparedObject = (UserFoodProductRatingID) object;
        return Objects.equals(userID, comparedObject.userID) && Objects.equals(code, comparedObject.code)
                && Objects.equals(rating, comparedObject.rating);
    }
}
