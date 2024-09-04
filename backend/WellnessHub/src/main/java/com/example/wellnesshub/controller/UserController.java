package com.example.wellnesshub.controller;

import com.example.wellnesshub.model.CalorieCalculator;
import com.example.wellnesshub.model.CaloriesToBeBurned;
import com.example.wellnesshub.model.Diet;
import com.example.wellnesshub.model.User;
import com.example.wellnesshub.service.UserService;
import com.example.wellnesshub.service.JwtService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	private RestTemplate restTemplate;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully");
            
            int[] data = CalorieCalculator.calculateCaloriesIntake(user);
            
            int caloriesIntake = data[0];
            int caloriesToBeBurned = data[1];
            int activityLevel = data[2];
            
            Diet diet = new Diet();
            diet.setUserId(user.getId());
            diet.setCaloriesIntake(caloriesIntake); // Default value
            diet.setDietaryPreference(user.getDietaryPreference());
            
            CaloriesToBeBurned fitness = new CaloriesToBeBurned();
            fitness.setUserId(user.getId());
            fitness.setCaloriesToBeBurned(caloriesToBeBurned); // Default value
            fitness.setActivityLevel(activityLevel);
            
            
            restTemplate.postForObject("http://localhost:8081/DietPlanner/api/diets", diet, Diet.class);
            restTemplate.postForObject("http://localhost:8081/fitness/api/caloriesToBeBurned", fitness, CaloriesToBeBurned.class);
            return ResponseEntity.ok(response);

        } 
        catch (Exception e) {
        	Map<String, String> response = new HashMap<>();
            response.put("message", "User registered unsuccessfully");
            return ResponseEntity.status(400).body(response);
        }
    }

    @GetMapping("/check-username")
    public ResponseEntity<Map<String, Boolean>> checkUsername(@RequestParam String username) {
        boolean exists = userService.existsByUsername(username);
        return ResponseEntity.ok(Map.of("exists", exists));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        
        if (userService.authenticate(user.getUsername(), user.getPassword())) {
            String token = jwtService.generateToken(user.getUsername());
            response.put("token", token); // Include the token in the response
            response.put("user",userService.getUserByUsername(user.getUsername()));
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "Invalid credentials");
            return ResponseEntity.status(401).body(response);
        }
    }
    
    @GetMapping("/protected")
    public ResponseEntity<Map<String, Object>> protectedResource() {
        return ResponseEntity.ok(Map.of("Hello", "Hello"));
    }
}
