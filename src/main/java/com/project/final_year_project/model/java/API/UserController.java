package com.project.final_year_project.model.java.API;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.final_year_project.model.java.User;
import com.project.final_year_project.model.java.service.UserService;
import com.project.helper.JWTUtility;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * endpoint to allow users to create an account
     * 
     * @param user the account to be added
     * @return a response entity with the status code 200 and created account
     */
    @PostMapping("/account")
    public ResponseEntity<?> createAccount(@RequestBody User user) {
        userService.saveUser(user);
        String token = JWTUtility.generateUserToken(user);
        System.out.println(token);
        user.getUserID();
        Map<String, String> userToken = Map.of("userToken", token, "username", user.getUsername(), "password",
                user.getPassword(), "userID", Long.toString(user.getUserID()));
        return ResponseEntity.ok(userToken);
    }

    /**
     * endpoint to allow users to log in
     * 
     * @param enteredUser user attempting to login
     * @return response entity with the user in it returns 200 OK if successful 401
     *         otherwise
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginToAccount(@RequestBody User enteredUser) {
        String token = JWTUtility.generateUserToken(enteredUser);
        if (userService.logInUser(enteredUser.getUsername(), enteredUser.getPassword())) {
            Map<String, String> userToken = Map.of("userToken", token, "username", enteredUser.getUsername(), "userID",
                    Long.toString(enteredUser.getUserID()));
            return ResponseEntity.ok(userToken);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(enteredUser);
    }
}
