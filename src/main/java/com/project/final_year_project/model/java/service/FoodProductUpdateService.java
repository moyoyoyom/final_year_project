package com.project.final_year_project.model.java.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.final_year_project.model.java.FoodProduct;
import com.project.final_year_project.model.java.Keyword;
import com.project.final_year_project.model.java.NutritionalInformation;
import com.project.final_year_project.model.java.StagingFoodProduct;
import com.project.final_year_project.model.java.data.repository.FoodProductRepository;
import com.project.final_year_project.model.java.data.repository.KeywordRepository;
import com.project.final_year_project.model.java.data.repository.StagingFoodProductRepository;

@Service
public class FoodProductUpdateService {
    private final FoodProductRepository foodProductRepository;
    private final StagingFoodProductRepository stagingFoodProductRepository;
    private final KeywordRepository keywordRepository;
    private final StagingFoodProductService stagingFoodProductService;
    private final ObjectMapper objectMapper;
    private final Map<String, Keyword> keywordCache = new ConcurrentHashMap<>();

    @Autowired
    public FoodProductUpdateService(FoodProductRepository foodProductRepository,
            StagingFoodProductRepository stagingFoodProductRepository, KeywordRepository keywordRepository,
            StagingFoodProductService stagingFoodProductService,
            ObjectMapper objectMapper) {
        this.foodProductRepository = foodProductRepository;
        this.stagingFoodProductRepository = stagingFoodProductRepository;
        this.keywordRepository = keywordRepository;
        this.stagingFoodProductService = stagingFoodProductService;
        this.objectMapper = objectMapper;
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Transactional
    public void updateFoodProductsFromStagingTable() {
        stagingFoodProductService.populateTableWithCSV("foodproducts.csv");
        System.out.println("Staging food product table has been populated");

        List<FoodProduct> foodProductBatch = new ArrayList<>();
        int batchSize = 1000;
        Set<String> existingFoodProductsCodes = foodProductRepository.findAllCodes();

        try (Stream<StagingFoodProduct> stream = stagingFoodProductRepository.streamAll()) {
            stream.forEach(stagingFoodProduct -> {
                if (!existingFoodProductsCodes.contains(stagingFoodProduct.getCode())) {
                    FoodProduct foodProduct = mapStagedFoodProductToFoodProduct(stagingFoodProduct);
                    foodProductBatch.add(foodProduct);
                }

                if (foodProductBatch.size() >= batchSize) {
                    foodProductRepository.saveAll(new ArrayList<>(foodProductBatch));
                    foodProductBatch.clear();
                }
            });
        }

        if (!foodProductBatch.isEmpty()) {
            foodProductRepository.saveAll(new ArrayList<>(foodProductBatch));
            foodProductBatch.clear();
        }

        stagingFoodProductRepository.deleteAll();
        System.out.println("Attempted to update the Food Product table");
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
            exception.printStackTrace();
        }

        NutritionalInformation nutritionalInformation = getNutritionalInformationFromJSONString(
                stagedFoodProduct.getNutritionalInformation());
        foodProduct.setNutritionalInformation(nutritionalInformation);

        foodProduct.setKeywords(mapKeywordsFromStagedFoodProduct(stagedFoodProduct.getKeywords()));

        return foodProduct;
    }

    public List<String> convertJSONToList(String jsonAsString) {
        try {
            String formattedString = jsonAsString.replaceAll("\"\"", "\"");
            return objectMapper.readValue(formattedString, new TypeReference<List<String>>() {
            });
        } catch (Exception exception) {
            exception.printStackTrace();
            List<String> emptyList = new ArrayList<>();
            return emptyList;
        }
    }

    public NutritionalInformation getNutritionalInformationFromJSONString(String nutritionalInformationJSONString) {
        try {
            return objectMapper.readValue(nutritionalInformationJSONString, NutritionalInformation.class);
        } catch (JsonProcessingException exception) {
            exception.printStackTrace();
            return null;
        }
    }

    private List<Keyword> mapKeywordsFromStagedFoodProduct(String keywordsJSONString) {
        List<Keyword> keywords = new ArrayList<>();
        String[] rawKeywords = formatJSONString(keywordsJSONString);
        for (String keyword : rawKeywords) {
            String cleanedKeyword = keyword.trim().replaceAll("^\"|\"$", "");

            Keyword resolvedKeyword = findKeyword(cleanedKeyword);
            keywords.add(resolvedKeyword);
        }
        return keywords;
    }

    private String[] formatJSONString(String JSONString) {
        return JSONString
                .replaceAll("\"\"", "\"")
                .replaceAll("^\\[|\\]$", "")
                .split(",");
    }

    private Keyword findKeyword(String keywordText) {
        Keyword cachedKeyword = keywordCache.get(keywordText);
        if (cachedKeyword != null) {
            return cachedKeyword;
        }

        Optional<Keyword> keywordFromRepository = keywordRepository.findByKeywordText(keywordText);
        if (keywordFromRepository.isPresent()) {
            Keyword foundKeyword = keywordFromRepository.get();
            keywordCache.put(keywordText, foundKeyword);
            return foundKeyword;
        }

        Keyword newKeyword = new Keyword(keywordText);
        Keyword savedKeyword = keywordRepository.save(newKeyword);
        keywordCache.put(keywordText, savedKeyword);
        return savedKeyword;
    }
}
