package com.example.fitness.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.fitness.model.ActivitySummary;
import com.example.fitness.model.CaloriesToBeBurned;
import com.example.fitness.model.DailyActivitySummary;
import com.example.fitness.model.FitnessActivity;
import com.example.fitness.repository.CaloriesToBeBurnedRepository;
import com.example.fitness.repository.FitnessActivityRepository;


@Service
public class FitnessActivityService {

    @Autowired
    private FitnessActivityRepository repository;

    @Autowired
    private RestTemplate restTemplate;

    public FitnessActivity saveFitnessActivity(Long userId, String activityType, int duration, double weightKg, double heightCm, int age, LocalDate date) {
        String query = activityType + " for " + duration + " minutes";

        // Create request body for the API
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("query", query);
        requestBody.put("weight_kg", weightKg);
        requestBody.put("height_cm", heightCm);
        requestBody.put("age", age);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-app-id", "ba07c6d1");
        headers.set("x-app-key", "35d19200749a26674d81a581834318fb");

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // Call the Nutritionix API
        ResponseEntity<Map> response = restTemplate.exchange(
                "https://trackapi.nutritionix.com/v2/natural/exercise",
                HttpMethod.POST,
                requestEntity,
                Map.class
        );

        // Extract calories burned
        double caloriesBurned = 0;
        List<Map<String, Object>> exercises = (List<Map<String, Object>>) response.getBody().get("exercises");
        if (exercises != null && !exercises.isEmpty()) {
        	Object caloriesObj = exercises.get(0).get("nf_calories");
            
            if (caloriesObj instanceof Number) {
                caloriesBurned = ((Number) caloriesObj).doubleValue();
            }
        }

        // Save to database
        FitnessActivity fitnessActivity = new FitnessActivity();
        
        fitnessActivity.setUserId(userId);
        fitnessActivity.setActivityType(activityType);
        fitnessActivity.setDurationMinutes(duration);
        fitnessActivity.setCaloriesBurned(caloriesBurned);
        fitnessActivity.setActivityDate(date);

        return repository.save(fitnessActivity);
    }

    public double getCaloriesBurnedLast30Days(Long userId) {
        LocalDate startDate = LocalDate.now().minusDays(30);
        return repository.getCaloriesBurned(userId, startDate, LocalDate.now().minusDays(1)); // Exclude today
    }

    public double getCaloriesBurnedLast7Days(Long userId) {
        LocalDate startDate = LocalDate.now().minusDays(7);
        return repository.getCaloriesBurned(userId, startDate, LocalDate.now().minusDays(1)); // Exclude today
    }

    public double getCaloriesBurnedLastDay(Long userId) {
        LocalDate startDate = LocalDate.now().minusDays(1);
        return repository.getCaloriesBurned(userId, startDate, LocalDate.now().minusDays(1)); // Exclude today
    }

    public double getCaloriesBurnedToday(Long userId) {
        LocalDate today = LocalDate.now();
        return repository.getCaloriesBurnedToday(userId, today);
    }

	public List<FitnessActivity> getActivityHistory(Long userId) {
		Pageable pageable = PageRequest.of(0, 10); // Page 0, size 10
        return repository.findTop10ActivitiesByUserId(userId, pageable);
	}
	
	public List<DailyActivitySummary> getTopDatesByCaloriesBurned(Long userId) {
		Pageable pageable = PageRequest.of(0, 10); // Top 10 results

        // Fetch the data
        List<Object[]> rawData = repository.findTopDatesByCaloriesBurned(userId, pageable);

        // Convert raw data to DailyActivitySummary
        List<DailyActivitySummary> summaries = new ArrayList<>();
        for (Object[] row : rawData) {
            LocalDate date = (LocalDate) row[0];
            double totalCalories = (double) row[1];
            long totalDuration = (long) row[2];

            summaries.add(new DailyActivitySummary(date, totalCalories, totalDuration));
        }

        return summaries;
    }
	
	public List<DailyActivitySummary> getLast10DaysActivities(Long userId) {
        LocalDate startDate = LocalDate.now().minusDays(10);
        return repository.getLast10DaysActivities(userId, startDate);
    }
	
	public List<ActivitySummary> getTopActivities(Long userId) {
	    return repository.findTopActivities(userId, PageRequest.of(0, 12));
	}
	
	@Autowired
    private CaloriesToBeBurnedRepository caloriesToBeBurnedRepository;

	public CaloriesToBeBurned createCaloriesToBeBurned(CaloriesToBeBurned caloriesToBeBurned) {
		return caloriesToBeBurnedRepository.save(caloriesToBeBurned);
	}
	
	public int getCaloriesToBeBurned(Long userId) {
        CaloriesToBeBurned caloriesToBeBurned = caloriesToBeBurnedRepository.findByUserId(userId);

        if (caloriesToBeBurned != null) {
            return caloriesToBeBurned.getCaloriesToBeBurned();
        } else {
            throw new IllegalArgumentException("No data found for user ID: " + userId);
        }
    }

}

