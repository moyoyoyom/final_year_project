package com.project.final_year_project.model.java.service;

import org.springframework.stereotype.Service;

import com.project.final_year_project.model.java.data.User;
import com.project.final_year_project.model.java.data.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /*
     * public void addNewUser(String username) throws SQLException { // check if the
     * user exists Optional<User> user = userDao.getUserByUsername(username); // add
     * them to the database user.ifPresent(e -> { try {
     * userDao.createUser(e.getUserID(), e.getUsername(), e.getPassword()); } catch
     * (SQLException exception) { exception.printStackTrace(); } }); }
     */

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
