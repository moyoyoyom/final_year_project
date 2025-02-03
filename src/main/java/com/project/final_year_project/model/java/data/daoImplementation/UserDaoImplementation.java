package com.project.final_year_project.model.java.data.daoImplementation;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

import com.project.final_year_project.model.java.User;
import com.project.final_year_project.model.java.data.dao.UserDao;

public class UserDaoImplementation implements UserDao {
    private static String databaseUrl = "jdbc:duckdb:/Users/moyak/gourmet-buddy.db";

    @Override
    public User getUserByID(Integer ID) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUserByID'");
    }

    @Override
    public void getUserByUsername(String username) throws SQLException {
        /*
         * Optional<User> resultUser = Optional.ofNullable(null);
         * Connection databaConnection = DriverManager.getConnection(databaseUrl);
         * PreparedStatement selectUserStatement = databaConnection.prepareStatement("""
         * SELECT userID, username, password
         * FROM Users
         * WHERE username = ?
         * """);
         * selectUserStatement.setString(1, username);
         * 
         * try (ResultSet result = selectUserStatement.executeQuery()) {
         * while (result.next()) {
         * Integer resultUserID = result.getInt(1);
         * String resultUsername = result.getString(2);
         * String resultPassword = result.getString(3);
         * return Optional.of(new User(resultUserID, resultUsername, resultPassword));
         * }
         * }
         * 
         * return resultUser;
         */
    }

    @Override
    public void createUser(Integer ID, String username, String password) throws SQLException {
        Connection databaseConnection = DriverManager.getConnection(databaseUrl);
        PreparedStatement createUserStatment = databaseConnection.prepareStatement("""
                INSERT INTO Users (userID, username, password)
                VALUES(?,?,?);
                """);
        createUserStatment.setInt(1, ID);
        createUserStatment.setString(2, username);
        createUserStatment.setString(3, password);
        createUserStatment.executeQuery();
        createUserStatment.close();
        databaseConnection.close();
    }

    @Override
    public void deleteUser(Integer ID) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteUser'");
    }

    @Override
    public void updateUser(Integer ID) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
    }

}
