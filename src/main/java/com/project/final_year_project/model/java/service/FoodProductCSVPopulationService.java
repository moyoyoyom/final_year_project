package com.project.final_year_project.model.java.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.zip.GZIPInputStream;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.CSVWriter;

@Service
public class FoodProductCSVPopulationService {
    private static final String RAW_INPUT_FILE = "openfoodfacts-products.jsonl.gz";
    private static final String FOOD_PRODUCT_CSV_FILE = "foodproducts.csv";

    // Writes the CSV file with the raw data for the Food Product Table
    public void writeFoodProductCSV() {
        ObjectMapper objectMapper = new ObjectMapper();

        if (!doesFoodProductCSVExist()) {
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

                        String barcodePath = convertBarcodeToPath(code);
                        String imageUrl = constructImageUrl(barcodePath, node);

                        String ingredientsText = node.path("ingredients_text").asText("");
                        String nutritionalInformation = node.path("nutriments").toString();
                        String productName = node.path("product_name").asText("");
                        String quantity = node.path("quantity").asText("");
                        JsonNode categoriesNode = node.path("categories_hierarchy");
                        String categories = objectMapper.writeValueAsString(categoriesNode);
                        JsonNode keywordsNode = node.path("_keywords");
                        String keywords = objectMapper.writeValueAsString(keywordsNode);

                        String[] csvRow = { code, brands, imageUrl, ingredientsText, keywords,
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

    public boolean doesFoodProductCSVExist() {
        File foodProductCSV = new File(FOOD_PRODUCT_CSV_FILE);
        return foodProductCSV.exists();
    }

    public String convertBarcodeToPath(String barcode) {
        if (barcode.length() != 13) {
            // Add leading zeroes, so now it is 13 digits
            barcode = String.format("%013d", Long.parseLong(barcode)) + "/";
        }

        String firstPart = barcode.substring(0, 3);
        String secondPart = barcode.substring(3, 6);
        String thirdPart = barcode.substring(6, 9);
        String fourthPart = barcode.substring(9, 12);
        String fifthPart = barcode.substring(12, 13);

        return firstPart + "/" + secondPart + "/" + thirdPart + "/" + fourthPart + fifthPart + "/";
    }

    public String constructImageUrl(String barcodePath, JsonNode foodProductNode) {
        JsonNode imageNode = foodProductNode.path("images");
        List<String> sizes = List.of("full", "400", "100");

        for (Iterator<Map.Entry<String, JsonNode>> imageFieldsIterator = imageNode.fields(); imageFieldsIterator
                .hasNext();) {
            Map.Entry<String, JsonNode> imageFieldsMapEntry = imageFieldsIterator.next();
            String imageKey = imageFieldsMapEntry.getKey();
            JsonNode info = imageFieldsMapEntry.getValue();

            String rev = info.path("rev").asText(null);

            if (rev != null) {
                for (String size : sizes) {
                    if (info.path("sizes").has(size)) {
                        return "https://images.openfoodfacts.org/images/products/"
                                + barcodePath + imageKey + "." + rev + "." + size + ".jpg";
                    }
                }
            }
        }
        return "";
    }
}
