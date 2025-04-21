package com.project.final_year_project.model.java.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.stereotype.Service;

@Service
public class FileDownloader {
    private static final String FOOD_PRODUCT_DUMP_FILE = "openfoodfacts-products.jsonl.gz";
    private static final String FOOD_PRODUCT_FILE_LINK = "https://static.openfoodfacts.org/data/openfoodfacts-products.jsonl.gz";
    private static final String DESTINATION_FILE = "openfoodfacts-products.jsonl.gz";

    public void updateFoodProductDump() throws InterruptedException, IOException {
        File foodProductFile = new File(FOOD_PRODUCT_DUMP_FILE);

        if (!foodProductFile.exists()) {
            System.out.println("openfoodfacts-products.jsonl.gz not found");
            downloadFoodProductFile();
        } else {
            System.out.println("openfoodfacts-products.jsonl.gz was found");
        }
    }

    public void downloadFoodProductFile() throws InterruptedException, IOException {
        HttpClient httpClient = HttpClient.newBuilder().followRedirects(HttpClient.Redirect.ALWAYS).build();
        HttpRequest httpRequest = HttpRequest.newBuilder().uri(URI.create(FOOD_PRODUCT_FILE_LINK)).GET().build();

        HttpResponse<InputStream> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofInputStream());
        System.out.println("Response is: " + response);
        if (response.statusCode() == 200) {
            try (InputStream inputStream = response.body();
                    FileOutputStream outputStream = new FileOutputStream(DESTINATION_FILE)) {

                inputStream.transferTo(outputStream);
                System.out.println("Finished downloading: " + DESTINATION_FILE);
            } catch (Exception exception) {
                exception.printStackTrace();
            }
        }
    }
}
