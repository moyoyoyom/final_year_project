package com.project.final_year_project.model.java.data.daoImplementation;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.project.final_year_project.model.java.FoodProduct;
import com.project.final_year_project.model.java.data.dao.FoodProductDao;
import com.project.final_year_project.model.java.data.dataAccess.DatabaseConnection;

public class FoodProductDaoImpl implements FoodProductDao {

    @Override
    public FoodProduct getFoodProductByAssignedID(Integer assignedID) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getFoodProductByAssignedID'");
    }

    @Override
    public List<FoodProduct> getFoodProductByName(String productName) throws SQLException {
        List<FoodProduct> results = new ArrayList<>();
        DatabaseConnection connection = new DatabaseConnection();
        PreparedStatement statement = connection.getConnection().prepareStatement("""
                SET default_collation = 'nocase';

                SELECT * FROM FoodProduct WHERE product_name = ?;
                """);
        statement.setString(1, productName);
        try (ResultSet rawResults = statement.executeQuery()) {
            while (rawResults.next()) {
                Integer assigned_id = rawResults.getInt(1);
                String _id = rawResults.getString(2);
                String code = rawResults.getString(3);
                String product_name = rawResults.getString(4);
                String ingredients_text = rawResults.getString(5);
                String quantity = rawResults.getString(6);
                results.add(new FoodProduct(assigned_id, _id, code, product_name, ingredients_text, quantity));
            }
        }
        statement.close();
        return results;
    }

    @Override
    public void deleteFoodProductID(Integer assignedID) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteFoodProductID'");
    }

    @Override
    public void updateFoodProductID(Integer assignedID, FoodProduct product) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateFoodProductID'");
    }

    @Override
    public void createFoodProductID(FoodProduct product) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createFoodProductID'");
    }

}
