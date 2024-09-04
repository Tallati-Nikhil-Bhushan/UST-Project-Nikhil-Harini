package com.example.DietPlanner.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.DietPlanner.model.Diet;
import com.example.DietPlanner.repository.DietRepository;

@Service
public class DietService {

    @Autowired
    private DietRepository dietRepository;

    public Diet createDiet(Diet diet) {
        return dietRepository.save(diet);
    }

    public Diet getDietByUserId(Long userId) {
        return dietRepository.findByUserId(userId);
    }

    public Diet updateDiet(Long userId, Diet dietDetails) {
        Diet diet = dietRepository.findByUserId(userId);
        diet.setCaloriesIntake(dietDetails.getCaloriesIntake());
        diet.setDietaryPreference(dietDetails.getDietaryPreference());
        return dietRepository.save(diet);
    }
    
    public Map<String, Integer> getCaloriesByMeals(Long userId) {
        // Retrieve the diet record based on userId
        Diet diet = getDietByUserId(userId);
        int totalCalories = diet.getCaloriesIntake();

        // Divide the total calories into 4 meals
        int lunchAndDinner = totalCalories / 3;
        int breakfastAndSnacks = totalCalories / 3;
        
        int snacks = breakfastAndSnacks/3;
        int breakfast = breakfastAndSnacks - snacks;

        // Create a map to return meal calorie distribution
        Map<String, Integer> meals = new HashMap<>();
        meals.put("totalCalories", totalCalories);
        meals.put("Lunch", lunchAndDinner);
        meals.put("Dinner", lunchAndDinner);
        meals.put("Breakfast", breakfast);
        meals.put("Snacks", snacks);

        return meals;
    }
}
