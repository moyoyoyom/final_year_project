package com.project.final_year_project.model.java.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.final_year_project.model.java.FoodProduct;
import com.project.final_year_project.model.java.FoodProductResponse;
import com.project.final_year_project.model.java.Keyword;
import com.project.final_year_project.model.java.UserFoodProductRating;
import com.project.final_year_project.model.java.data.repository.FoodProductRepository;
import com.project.final_year_project.model.java.data.repository.KeywordRepository;
import com.project.final_year_project.model.java.data.repository.UserFoodProductRatingRepository;

@Service
public class FoodProductService {
    private final RestTemplate restTemplate;
    private final FoodProductRepository foodProductRepository;
    private final UserFoodProductRatingRepository userFoodProductRatingRepository;
    private final KeywordRepository keywordRepository;

    @Autowired
    public FoodProductService(RestTemplate restTemplate, FoodProductRepository foodProductRepository,
            UserFoodProductRatingRepository userFoodProductRatingRepository, KeywordRepository keywordRepository) {
        this.restTemplate = restTemplate;
        this.foodProductRepository = foodProductRepository;
        this.userFoodProductRatingRepository = userFoodProductRatingRepository;
        this.keywordRepository = keywordRepository;
    }

    public FoodProduct getFoodProductByBarcode(String barcode) {
        Optional<FoodProduct> cachedFoodProduct = foodProductRepository.findById(barcode);
        if (cachedFoodProduct.isPresent()) {
            return cachedFoodProduct.get();
        }
        String foodProductUrl = "https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json";
        FoodProductResponse response = restTemplate.getForObject(foodProductUrl, FoodProductResponse.class);

        List<Keyword> foodProductKeywords = new ArrayList<>();

        if (response != null) {
            // get keywords from keyword repository to prevent duplicate keywords being
            // insterted
            FoodProduct foodProduct = response.getFoodProduct();
            for (Keyword keyword : foodProduct.getKeywords()) {
                String keywordText = keyword.getKeywordText();
                Optional<Keyword> foundKeyword = keywordRepository.findByKeywordText(keywordText);

                if (foundKeyword.isPresent()) {
                    foodProductKeywords.add(foundKeyword.get());
                } else {
                    foodProductKeywords.add(new Keyword(keywordText));
                }
            }
            response.getFoodProduct().setKeywords(foodProductKeywords);

            foodProductRepository.save(response.getFoodProduct());
        }
        return (response != null) ? response.getFoodProduct() : null;
    }

    public List<FoodProduct> getUserRecommendations(Long userID, int numberOfRecommendations,
            @Nullable String recommendationTheme) {
        List<UserFoodProductRating> userFoodProductRatings = userFoodProductRatingRepository.findByUserUserID(userID);
        Set<String> userFoodProductRatingIDs = userFoodProductRatings.stream()
                .map(userFoodProductRating -> userFoodProductRating.getFoodProduct().getCode())
                .collect(Collectors.toSet());

        Set<String> excludedFoodProductIDs = userFoodProductRatingIDs.isEmpty() ? Set.of("no ids")
                : userFoodProductRatingIDs;

        List<FoodProduct> ratedFoodProducts = userFoodProductRatings.stream()
                .map(UserFoodProductRating::getFoodProduct)
                .collect(Collectors.toList());

        Set<String> mostCommonKeywords = findMostCommonKeywords(ratedFoodProducts);

        if (recommendationTheme != null && !recommendationTheme.isBlank()) {
            mostCommonKeywords.add(recommendationTheme);
        }

        if (mostCommonKeywords.isEmpty()) {
            System.out.println("common keywords are empty");
            return foodProductRepository.getRandomFoodProducts(PageRequest.of(0, numberOfRecommendations));
        }

        List<FoodProduct> possibleRecommendations = foodProductRepository.findRecommendations(mostCommonKeywords,
                excludedFoodProductIDs);

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

    public List<FoodProduct> getFoodProductBySearchTerm(String query) {
        List<FoodProduct> results = foodProductRepository.searchByProductNameOrBrand(query);
        return results;
    }
}
