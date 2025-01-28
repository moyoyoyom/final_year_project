package com.project.final_year_project.model.java.API;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    @RequestMapping("/search")
    public String returnSearchResult() {
        return "Found";
    }
    // post
    /*
     * @RequestMapping(value = "/search, method = RequestMethod.POST")
     * 
     * @ResponseStatus(HttpStatus.CREATED) public void addSearch(@RequestBody String
     * searchTerm) { System.out.println("posted"); }
     */
}
