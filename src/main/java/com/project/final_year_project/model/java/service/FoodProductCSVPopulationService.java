package com.project.final_year_project.model.java.service;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.zip.GZIPInputStream;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.CSVWriter;

@Service
public class FoodProductCSVPopulationService {
    private static final String RAW_INPUT_FILE = "en.openfoodfacts.org.products.json.gz";
    private static final String FOOD_PRODUCT_CSV_FILE = "foodproducts.csv";

    // Writes the CSV file with the raw data for the Food Product Table
    public void writeFoodProductCSV() {
        ObjectMapper objectMapper = new ObjectMapper();

        try (
                // Initialise all the objects needed to read the gzip file
                // After reading each line of the gzip file, the line is added to
                // foodproducts.csv

                GZIPInputStream gzipInputStream = new GZIPInputStream(new FileInputStream(RAW_INPUT_FILE));
                BufferedReader fileReader = new BufferedReader(new InputStreamReader(gzipInputStream));
                Writer fileWriter = Files.newBufferedWriter(Paths.get(FOOD_PRODUCT_CSV_FILE));
                CSVWriter csvFileWriter = new CSVWriter(fileWriter, ',', CSVWriter.DEFAULT_QUOTE_CHARACTER,
                        CSVWriter.DEFAULT_ESCAPE_CHARACTER, CSVWriter.DEFAULT_LINE_END);) {

            String[] csvFileColumnHeaders = { "code", "brands", "imageUrl", "ingredientsText", "keywords",
                    "nutritionalInformation", "productName", "quantity", "categories" };

            csvFileWriter.writeNext(csvFileColumnHeaders);

            String line;
            int numberOfLines = 0;

            while ((line = fileReader.readLine()) != null) {
                try {
                    JsonNode node = objectMapper.readTree(line);

                    String code = node.path("code").asText("");
                    String brands = node.path("brands").asText("");
                    String imageUrl = node.path("image_url").asText("");
                    String ingredientsText = node.path("ingredients_text").asText("");
                    String nutritionalInformation = node.path("nutriments").toString();
                    String productName = node.path("product_name").asText("");
                    String quantity = node.path("quantity").asText("");
                    JsonNode categoriesNode = node.path("categories_hierarchy");
                    String categories = objectMapper.writeValueAsString(categoriesNode);
                    JsonNode keywordsNode = node.path("_keywords");
                    String keywords = objectMapper.writeValueAsString(keywordsNode);

                    String[] csvRow = { code, brands, imageUrl, ingredientsText, keywords, keywords,
                            nutritionalInformation, productName, quantity, categories };
                    csvFileWriter.writeNext(csvRow);

                    numberOfLines++;
                } catch (Exception exception) {
                    System.err.println("Problem adding this line: " + line);
                    exception.printStackTrace();
                }
            }
            System.out.println(numberOfLines + " food products in foodproducts.csv file");
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

}
