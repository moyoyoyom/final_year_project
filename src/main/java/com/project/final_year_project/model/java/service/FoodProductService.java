package com.project.final_year_project.model.java.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.final_year_project.model.java.FoodProduct;
import com.project.final_year_project.model.java.FoodProductResponse;
import com.project.final_year_project.model.java.Keyword;
import com.project.final_year_project.model.java.UserFoodProductRating;
import com.project.final_year_project.model.java.data.repository.FoodProductRepository;
import com.project.final_year_project.model.java.data.repository.UserFoodProductRatingRepository;

@Service
public class FoodProductService {
    private final RestTemplate restTemplate;
    private final FoodProductRepository foodProductRepository;
    private final UserFoodProductRatingRepository userFoodProductRatingRepository;

    @Autowired
    public FoodProductService(RestTemplate restTemplate, FoodProductRepository foodProductRepository,
            UserFoodProductRatingRepository userFoodProductRatingRepository) {
        this.restTemplate = restTemplate;
        this.foodProductRepository = foodProductRepository;
        this.userFoodProductRatingRepository = userFoodProductRatingRepository;
    }

    public FoodProduct getFoodProductByBarcode(String barcode) {
        Optional<FoodProduct> cachedFoodProduct = foodProductRepository.findById(barcode);
        if (cachedFoodProduct.isPresent()) {
            return cachedFoodProduct.get();
        }
        String foodProductUrl = "https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json";
        FoodProductResponse response = restTemplate.getForObject(foodProductUrl, FoodProductResponse.class);

        if (response != null)
            foodProductRepository.save(response.getFoodProduct());
        return (response != null) ? response.getFoodProduct() : null;
    }

    public List<FoodProduct> getUserRecommendations(Long userID, int numberOfRecommendations) {
        List<UserFoodProductRating> userFoodProductRatings = userFoodProductRatingRepository.findByUserUserID(userID);
        Set<String> userFoodProductRatingIDs = userFoodProductRatings.stream()
                .map(userFoodProductRating -> userFoodProductRating.getFoodProduct().getCode())
                .collect(Collectors.toSet());

        List<FoodProduct> ratedFoodProducts = userFoodProductRatings.stream()
                .map(UserFoodProductRating::getFoodProduct)
                .collect(Collectors.toList());

        Set<String> mostCommonKeywords = findMostCommonKeywords(ratedFoodProducts);

        List<FoodProduct> possibleRecommendations = foodProductRepository.findRecommendations(mostCommonKeywords,
                userFoodProductRatingIDs);

        return possibleRecommendations.stream()
                .limit(numberOfRecommendations)
                .collect(Collectors.toList());
    }

    public Set<String> findMostCommonKeywords(List<FoodProduct> foodProducts) {
        Set<String> keywords = new HashSet<>();

        for (FoodProduct foodProduct : foodProducts) {
            for (Keyword keyword : foodProduct.getKeywords()) {
                keywords.add(keyword.getKeywordText());
            }
        }

        return keywords;
    }

    public int scoreFoodProduct(FoodProduct foodProduct, Map<String, Integer> keywordFrequency) {
        int score = 0;
        List<Keyword> foodProductKeywords = Optional.ofNullable(foodProduct.getKeywords())
                .orElse(new ArrayList<Keyword>());
        for (Keyword keyword : foodProductKeywords) {
            score += keywordFrequency.getOrDefault(keyword.getKeywordText(), 0);
        }
        return score;
    }
}
