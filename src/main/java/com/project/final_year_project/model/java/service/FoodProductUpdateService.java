package com.project.final_year_project.model.java.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        stagingFoodProductService.populateTableWithCSV("foodproducts.csv");

        List<StagingFoodProduct> allStagedFoodProducts = stagingFoodProductRepository.findAll();
        allStagedFoodProducts.stream().forEach(
                stagedFoodProduct -> {
                    Optional<FoodProduct> existingFoodProduct = foodProductRepository
                            .findByCode(stagedFoodProduct.getCode());

                    if (!existingFoodProduct.isPresent()
                            || needToUpdateFoodProduct(existingFoodProduct.get(), stagedFoodProduct)) {
                        FoodProduct updatedFoodProduct = mapStagedFoodProductToFoodProduct(stagedFoodProduct);
                        foodProductRepository.save(updatedFoodProduct);
                    }
                });

        stagingFoodProductRepository.deleteAll();
        System.out.println("Updated the Food Product table");
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
            return !Objects.equals(existingNutritionalInformation, stagingFoodProduct.getNutrtionalInformation());
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
                    .readValue(stagedFoodProduct.getNutrtionalInformation(), NutritionalInformation.class);
            foodProduct.setNutritionalInformation(nutritionalInformation);
        } catch (Exception exception) {

        }

        List<Category> categories = Optional.ofNullable(stagedFoodProduct.getCategories())
                .map(categoriesString -> Arrays.stream(categoriesString.split(","))
                        .map(unformattedCategory -> unformattedCategory.trim())
                        .filter(categoryName -> !categoryName.isEmpty())
                        .map(categoryName -> categoryRepository.findByCategoryText(categoryName)
                                .orElseGet(() -> new Category(categoryName)))
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());

        foodProduct.setCategories(categories);

        List<Keyword> keywords = Optional.ofNullable(stagedFoodProduct.getKeywords())
                .map(keywordsString -> Arrays.stream(keywordsString.split(","))
                        .map(unformattedKeyword -> unformattedKeyword.trim())
                        .filter(keywordName -> !keywordName.isEmpty())
                        .map(keywordName -> keywordRepository.findByKeywordText(keywordName)
                                .orElseGet(() -> new Keyword(keywordName)))
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());

        foodProduct.setKeywords(keywords);

        return foodProduct;
    }
}
