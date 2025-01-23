package com.project.final_year_project.model.java.data.dataAccess;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static String databaseUrl = "jdbc:duckdb:/Users/moyak/gourmet-buddy.db";

    public Connection getConnection() throws SQLException {
        return DriverManager.getConnection(databaseUrl);
    }

    public void closeConnection(Connection connection) throws SQLException {
        connection.close();
    }
}
