package com.project.final_year_project.model.java.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.final_year_project.model.java.User;
import com.project.final_year_project.model.java.data.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> logInUser(String enterdUsername, String enteredPassword) {
        Optional<User> foundUser = Optional.ofNullable(userRepository.findByUsername(enterdUsername));
        if (foundUser.isPresent()) {
            if (foundUser.get().getPassword().equals(enteredPassword))
                return foundUser;
        }
        return Optional.empty();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
