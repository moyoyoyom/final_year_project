package com.project.final_year_project.model.java.API;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/searches")
public class SearchController {
    // post
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addSearch(@RequestBody String searchTerm) {
        System.out.println("posted");
    }
}
