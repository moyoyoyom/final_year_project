package com.project.final_year_project.model.java.service;

import java.security.Key;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.final_year_project.model.java.Category;
import com.project.final_year_project.model.java.FoodProduct;
import com.project.final_year_project.model.java.Keyword;
import com.project.final_year_project.model.java.NutritionalInformation;
import com.project.final_year_project.model.java.StagingFoodProduct;
import com.project.final_year_project.model.java.data.repository.CategoryRepository;
import com.project.final_year_project.model.java.data.repository.FoodProductRepository;
import com.project.final_year_project.model.java.data.repository.KeywordRepository;
import com.project.final_year_project.model.java.data.repository.StagingFoodProductRepository;

@Service
public class FoodProductUpdateService {
    private final FoodProductRepository foodProductRepository;
    private final StagingFoodProductRepository stagingFoodProductRepository;
    private final CategoryRepository categoryRepository;
    private final KeywordRepository keywordRepository;
    private final StagingFoodProductService stagingFoodProductService;
    private final ObjectMapper objectMapper;

    @Autowired
    public FoodProductUpdateService(FoodProductRepository foodProductRepository,
            StagingFoodProductRepository stagingFoodProductRepository, CategoryRepository categoryRepository,
            KeywordRepository keywordRepository, StagingFoodProductService stagingFoodProductService,
            ObjectMapper objectMapper) {
        this.foodProductRepository = foodProductRepository;
        this.stagingFoodProductRepository = stagingFoodProductRepository;
        this.categoryRepository = categoryRepository;
        this.keywordRepository = keywordRepository;
        this.stagingFoodProductService = stagingFoodProductService;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public void updateFoodProductsFromStagingTable() {
        System.out.println("Cleared the food product table");

        stagingFoodProductService.populateTableWithCSV("foodproducts.csv");
        System.out.println("Staging food product table has been populated");

        List<FoodProduct> foodProductBatch = new ArrayList<>();
        int batchSize = 1000;

        List<StagingFoodProduct> allStagedFoodProducts = stagingFoodProductRepository.findAll();
        allStagedFoodProducts.stream().forEach(
                stagedFoodProduct -> {
                    Optional<FoodProduct> existingFoodProduct = foodProductRepository
                            .findByCode(stagedFoodProduct.getCode());

                    if (!existingFoodProduct.isPresent()
                            || needToUpdateFoodProduct(existingFoodProduct.get(), stagedFoodProduct)) {
                        FoodProduct updatedFoodProduct = mapStagedFoodProductToFoodProduct(stagedFoodProduct);
                        // foodProductRepository.save(updatedFoodProduct);
                        foodProductBatch.add(updatedFoodProduct);
                    }

                    if (foodProductBatch.size() >= batchSize) {
                        foodProductRepository.saveAll(foodProductBatch);
                        foodProductBatch.clear();
                    }
                });

        if (!foodProductBatch.isEmpty()) {
            foodProductRepository.saveAll(foodProductBatch);
            foodProductBatch.clear();
        }

        stagingFoodProductRepository.deleteAll();
        System.out.println("Attempted to update the Food Product table");
    }

    private boolean needToUpdateFoodProduct(FoodProduct existingFoodProduct, StagingFoodProduct stagingFoodProduct) {
        try {
            if (!Objects.equals(existingFoodProduct.getBrands(), stagingFoodProduct.getBrands()))
                return true;
            if (!Objects.equals(existingFoodProduct.getImageUrl(), stagingFoodProduct.getImageUrl()))
                return true;
            if (!Objects.equals(existingFoodProduct.getIngredientsText(), stagingFoodProduct.getIngredientsText()))
                return true;
            if (!Objects.equals(existingFoodProduct.getQuantity(), stagingFoodProduct.getQuantity()))
                return true;
            if (!Objects.equals(existingFoodProduct.getProductName(), stagingFoodProduct.getProductName()))
                return true;

            String existingNutritionalInformation = objectMapper
                    .writeValueAsString(existingFoodProduct.getNutritionalInformation());
            return !Objects.equals(existingNutritionalInformation, stagingFoodProduct.getNutritionalInformation());
        } catch (Exception exception) {
            System.out.println("Caught exception: " + exception);
            return true;
        }
    }

    private FoodProduct mapStagedFoodProductToFoodProduct(StagingFoodProduct stagedFoodProduct) {
        FoodProduct foodProduct = new FoodProduct();
        foodProduct.setCode(stagedFoodProduct.getCode());
        foodProduct.setProductName(stagedFoodProduct.getProductName());
        foodProduct.setBrands(stagedFoodProduct.getBrands());
        foodProduct.setIngredientsText(stagedFoodProduct.getIngredientsText());
        foodProduct.setImageUrl(stagedFoodProduct.getImageUrl());
        foodProduct.setQuantity(stagedFoodProduct.getQuantity());

        try {
            NutritionalInformation nutritionalInformation = objectMapper
                    .readValue(stagedFoodProduct.getNutritionalInformation(), NutritionalInformation.class);
            foodProduct.setNutritionalInformation(nutritionalInformation);
        } catch (Exception exception) {

        }

        for (String categoryText : stagedFoodProduct.getCategories().split(",")) {
            Category category = categoryRepository.findByCategoryText(categoryText)
                    .orElseGet(() -> categoryRepository.save(new Category(categoryText)));

            if (foodProduct.getCategories() == null) {
                List<Category> categoryList = new ArrayList<>();
                foodProduct.setCategories(categoryList);
            }

            foodProduct.getCategories().add(category);
        }

        for (String keywordText : stagedFoodProduct.getKeywords().split(",")) {
            Keyword keyword = keywordRepository.findByKeywordText(keywordText)
                    .orElseGet(() -> keywordRepository.save(new Keyword(keywordText)));

            if (foodProduct.getKeywords() == null) {
                List<Keyword> keywordList = new ArrayList<>();
                foodProduct.setKeywords(keywordList);
            }

            foodProduct.getKeywords().add(keyword);
        }

        return foodProduct;
    }

    public List<String> convertJSONToList(String jsonAsString) {
        try {
            String formattedString = jsonAsString.replaceAll("\"\"", "\"");

            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(formattedString, new TypeReference<List<String>>() {
            });
        } catch (Exception exception) {
            exception.printStackTrace();
            List<String> emptyList = new ArrayList<>();
            return emptyList;
        }
    }
}
