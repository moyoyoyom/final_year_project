package com.project.final_year_project.model.java.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.final_year_project.model.java.Category;
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
        Set<String> ratedFoodProductIDs = userFoodProductRatings.stream()
                .map(userFoodProductRating -> userFoodProductRating.getFoodProduct().getCode())
                .collect(Collectors.toSet());

        List<FoodProduct> ratedFoodProducts = userFoodProductRatings.stream()
                .map(userFoodProductRating -> userFoodProductRating.getFoodProduct()).collect(Collectors.toList());

        Map<String, Integer> keywordFrequency = findKeywordFrequency(ratedFoodProducts);
        Set<String> interactedCategories = findUserInteractedCategories(ratedFoodProducts);

        List<FoodProduct> possibleRecommendations = foodProductRepository.findRelevantFoodProducts(interactedCategories,
                ratedFoodProductIDs);

        return possibleRecommendations.stream()
                .sorted(Comparator
                        .comparingInt((foodProduct) -> scoreFoodProduct((FoodProduct) foodProduct, keywordFrequency))
                        .reversed())
                .limit(numberOfRecommendations)
                .collect(Collectors.toList());
    }

    public Map<String, Integer> findKeywordFrequency(List<FoodProduct> foodProducts) {
        Map<String, Integer> keywordFrequencies = new HashMap<>();
        for (FoodProduct foodProduct : foodProducts) {
            for (Keyword keyword : foodProduct.getKeywords()) {
                String keywordText = keyword.getKeywordText();
                keywordFrequencies.put(keywordText, keywordFrequencies.getOrDefault(keywordText, 0) + 1);
            }
        }
        return keywordFrequencies;
    }

    public Set<String> findUserInteractedCategories(List<FoodProduct> foodProducts) {
        Set<String> userCategories = new HashSet<>();
        for (FoodProduct foodProduct : foodProducts) {
            List<Category> categories = Optional.ofNullable(foodProduct.getCategories()).orElse(List.of());
            categories.stream().forEach((category) -> userCategories.add(category.getCategoryText()));
        }
        return userCategories;
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
