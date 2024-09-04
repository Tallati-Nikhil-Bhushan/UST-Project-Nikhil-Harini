package com.example.fitness.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.fitness.model.ActivityRequest;
import com.example.fitness.model.ActivitySummary;
import com.example.fitness.model.CaloriesToBeBurned;
import com.example.fitness.model.DailyActivitySummary;
import com.example.fitness.model.FitnessActivity;
import com.example.fitness.service.FitnessActivityService;

@RestController
@RequestMapping("/fitness/api")
public class FitnessActivityController {

    @Autowired
    private FitnessActivityService service;
    
    @GetMapping("/caloriesToBeBurned/{userId}")
    public ResponseEntity<Map<String, Integer>> getCaloriesToBeBurned(@PathVariable Long userId) {
        int targetCaloriesToBeBurned = service.getCaloriesToBeBurned(userId);

        Map<String, Integer> response = new HashMap<>();
        response.put("caloriesToBeBurned", targetCaloriesToBeBurned);

        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/caloriesToBeBurned")
    public ResponseEntity<CaloriesToBeBurned> createCaloriesToBeBurned(@RequestBody CaloriesToBeBurned caloriesToBeBurned) {
    	CaloriesToBeBurned createdCaloriesToBeBurned = service.createCaloriesToBeBurned(caloriesToBeBurned);
        return new ResponseEntity<>(createdCaloriesToBeBurned, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}/calories-burned/last-30-days")
    public double getCaloriesBurnedLast30Days(@PathVariable Long userId) {
        return service.getCaloriesBurnedLast30Days(userId);
    }

    @GetMapping("/{userId}/calories-burned/last-7-days")
    public double getCaloriesBurnedLast7Days(@PathVariable Long userId) {
        return service.getCaloriesBurnedLast7Days(userId);
    }

    @GetMapping("/{userId}/calories-burned/last-day")
    public double getCaloriesBurnedLastDay(@PathVariable Long userId) {
        return service.getCaloriesBurnedLastDay(userId);
    }

    @GetMapping("/{userId}/calories-burned/today")
    public double getCaloriesBurnedToday(@PathVariable Long userId) {
        return service.getCaloriesBurnedToday(userId);
    }

    @PostMapping("/add-activity")
    public ResponseEntity<FitnessActivity> addActivity(@RequestBody ActivityRequest request){
    Long userId = request.getUserId();
    String activityType = request.getActivityType();
    int duration = request.getDuration();
    double weightKg = request.getWeightKg();
    double heightCm = request.getHeightCm();
    int age = request.getAge();
    LocalDate date = request.getDate();

        FitnessActivity fitnessActivity = service.saveFitnessActivity(userId, activityType, duration, weightKg, heightCm, age, date);
        return ResponseEntity.ok(fitnessActivity);
    }
    
    @GetMapping("/activity-history/{userId}")
    public ResponseEntity<List<FitnessActivity>> getActivityHistory(@PathVariable Long userId) {       
        List<FitnessActivity> activities = service.getActivityHistory(userId);
        if (activities.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(activities, HttpStatus.OK);
    }
    
    @GetMapping("/top-10-dates/{userId}")
    public ResponseEntity<List<DailyActivitySummary>> getTopDatesByCaloriesBurned(@PathVariable Long userId) {
        List<DailyActivitySummary> summaries = service.getTopDatesByCaloriesBurned(userId);
        return ResponseEntity.ok(summaries);
    }
    
    @GetMapping("/last-10-days/{userId}")
    public ResponseEntity<List<DailyActivitySummary>> getLast10DaysActivities(@PathVariable Long userId) {
    	return ResponseEntity.ok(service.getLast10DaysActivities(userId));
    }
    
    @GetMapping("/top-activities/{userId}")
    public ResponseEntity<List<ActivitySummary>> getTopActivities(@PathVariable Long userId) {
        List<ActivitySummary> topActivities = service.getTopActivities(userId);
        return ResponseEntity.ok(topActivities);
    }
}

