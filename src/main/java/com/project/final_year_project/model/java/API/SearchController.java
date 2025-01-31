package com.project.final_year_project.model.java.API;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    @RequestMapping("/search")
    public String returnSearchResult() {
        return "Found";
    }
}
