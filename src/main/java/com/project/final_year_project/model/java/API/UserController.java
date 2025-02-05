package com.project.final_year_project.model.java.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.final_year_project.model.java.User;
import com.project.final_year_project.model.java.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * 
     * @param user the account to be added
     * @return a response entity with the status code 200 and created account
     */
    @PostMapping("/account")
    public ResponseEntity<User> createAccount(@RequestBody User user) {
        User newUser = userService.saveUser(user);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginToAccount(@RequestBody User enteredUser) {
        if (userService.logInUser(enteredUser.getUsername(), enteredUser.getPassword())) {
            return ResponseEntity.ok(enteredUser);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(enteredUser);
    }
}
