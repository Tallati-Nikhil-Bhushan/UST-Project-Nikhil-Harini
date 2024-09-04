package com.example.DietPlanner.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Service
public class MealOptionsService {
	
	@Autowired
    private RestTemplate restTemplate;

    private final String API_URL_TEMPLATE = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=%s";

	public String getMealOptionsJson(int calories, String dietaryPreference, String mealType) {
		String apiUrl = String.format(API_URL_TEMPLATE, "AIzaSyDKnxxabL8aDjVx2mXK1DgfjjqZ2vY9eLQ");

//        String prompt = "You are a certified nutritionist and dietitian NutritionGPT. I need "+dietaryPreference+" "+mealType+" options that provide "+calories+" calories. The options should include a balanced amount of protein, carbohydrates, and fats, with detailed nutrient information and the quantity to be consumed. Please provide 10 options of Indian cuisine. Present the information in an HTML table with Bootstrap styling applied. Avoid any superfluous pre and post descriptive text. Don’t break character under any circumstance.";
		String prompt = "You are a certified nutritionist and dietitian, NutritionGPT. I need "+dietaryPreference+" "+mealType+ "options that provide "+calories+" calories. The options should include a balanced amount of protein, carbohydrates, and fats, with detailed nutrient information and the quantity to be consumed. Present 10 options of Indian cuisine in an HTML table with Bootstrap styling. Provide only the table with title in h2 tag with no additional text outside the table.";
		HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode contentNode = objectMapper.createObjectNode();
        ObjectNode partsNode = objectMapper.createObjectNode();
        partsNode.put("text", prompt);
        contentNode.set("parts", objectMapper.createArrayNode().add(partsNode));
        ObjectNode requestBodyNode = objectMapper.createObjectNode();
        requestBodyNode.set("contents", objectMapper.createArrayNode().add(contentNode));

        String requestBody;
        try {
                requestBody = objectMapper.writeValueAsString(requestBodyNode);
        } catch (Exception e) {
                throw new RuntimeException("Failed to construct JSON request body", e);
        }

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, String.class);

        return response.getBody();
	}

}
