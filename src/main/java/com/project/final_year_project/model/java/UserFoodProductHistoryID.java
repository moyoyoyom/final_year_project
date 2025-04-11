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
public class UserFoodProductHistoryID implements Serializable {
    @Column(nullable = false)
    private Long userID;

    @Column(nullable = false)
    private String code;

    public UserFoodProductHistoryID(Long userID, String code) {
        this.userID = userID;
        this.code = code;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userID, code);
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (object == null || getClass() != object.getClass()) {
            return false;
        }

        UserFoodProductHistoryID comparedObject = (UserFoodProductHistoryID) object;
        return Objects.equals(userID, comparedObject.userID) && Objects.equals(code, comparedObject.code);
    }
}
