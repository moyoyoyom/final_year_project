package com.project.final_year_project.model.java.data.dao;

import java.sql.SQLException;
import java.util.Optional;

import com.project.final_year_project.model.java.User;

public interface UserDao {
    public User getUserByID(Integer ID);

    public void getUserByUsername(String username) throws SQLException;

    public void createUser(Integer ID, String username, String password) throws SQLException;

    public void deleteUser(Integer ID);

    public void updateUser(Integer ID);
}
