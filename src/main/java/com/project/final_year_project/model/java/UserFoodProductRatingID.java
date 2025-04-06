package com.project.final_year_project.model.java;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
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
    private Integer code;

    public UserFoodProductRatingID(Long userID, Integer code) {
        this.userID = userID;
        this.code = code;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userID, code);
    }

    @Override
    public boolean equals(Object object) {
        if (this == object)
            return true;
        if (object == null || getClass() != object.getClass())
            return false;

        UserFoodProductRatingID comparedObject = (UserFoodProductRatingID) object;
        return Objects.equals(userID, comparedObject.userID) && Objects.equals(code, comparedObject.code);
    }
}
