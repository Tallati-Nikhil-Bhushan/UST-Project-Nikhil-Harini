package com.example.DietPlanner.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.DietPlanner.model.Diet;
import com.example.DietPlanner.service.DietService;
import com.example.DietPlanner.service.MealOptionsService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/DietPlanner/api/diets")
public class DietController {

    @Autowired
    private DietService dietService;
    
    @Autowired
    MealOptionsService mealOptionsService;

    @PostMapping
    public ResponseEntity<Diet> createDiet(@RequestBody Diet diet) {
        Diet createdDiet = dietService.createDiet(diet);
        return new ResponseEntity<>(createdDiet, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Diet> getDietByUserId(@PathVariable Long userId) {
        Diet diet = dietService.getDietByUserId(userId);
        return new ResponseEntity<>(diet, HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Diet> updateDiet(@PathVariable Long userId, @RequestBody Diet dietDetails) {
        Diet updatedDiet = dietService.updateDiet(userId, dietDetails);
        return new ResponseEntity<>(updatedDiet, HttpStatus.OK);
    }
    
    @GetMapping("/{userId}/meals")
    public ResponseEntity<Map<String, Integer>> getCaloriesByMeals(@PathVariable Long userId) {
        Map<String, Integer> mealCalories = dietService.getCaloriesByMeals(userId);
        return new ResponseEntity<>(mealCalories, HttpStatus.OK);
    }
    
    @GetMapping("/meals/{mealType}")
    public ResponseEntity<String> getMealOptions(
            @PathVariable String mealType,
            @RequestParam("calories") int calories,
            @RequestParam("dietaryPreference") String dietaryPreference) {
        
        // Call service method with parameters and get HTML response
    	String jsonResponse = mealOptionsService.getMealOptionsJson(calories, dietaryPreference, mealType);

        // Extract the HTML content from the JSON response
        String htmlContent = extractHtmlFromJson(jsonResponse);

        return new ResponseEntity<>(htmlContent, HttpStatus.OK);
    }
    
    private String extractHtmlFromJson(String jsonResponse) {
        try {
            // Assuming jsonResponse is in a format like the one you provided
            JsonNode rootNode = new ObjectMapper().readTree(jsonResponse);
            JsonNode textNode = rootNode.path("candidates").get(0)
                                        .path("content").path("parts").get(0)
                                        .path("text");
            return textNode.asText();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Error parsing response";
        }
    }

}

