package com.project.final_year_project.model.java.data.dao;

import java.sql.SQLException;
import java.util.List;

import com.project.final_year_project.model.java.FoodProduct;

public interface FoodProductDao {
    public FoodProduct getFoodProductByAssignedID(Integer assignedID);

    public List<FoodProduct> getFoodProductByName(String productName) throws SQLException;

    public void deleteFoodProductID(Integer assignedID);

    public void updateFoodProductID(Integer assignedID, FoodProduct product);

    public void createFoodProductID(FoodProduct product);
}
