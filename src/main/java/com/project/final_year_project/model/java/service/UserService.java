package com.project.final_year_project.model.java.service;

import org.springframework.stereotype.Service;

import com.project.final_year_project.model.java.User;
import com.project.final_year_project.model.java.data.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean logInUser(String enterdUsername, String enteredPassword) {
        User foundUser = userRepository.findByUsername(enterdUsername);
        if ((foundUser != null) && (foundUser.getPassword().equals(enteredPassword))) {
            return true;
        }
        return false;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
