package com.example.fitness.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class FitnessActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String activityType;
    private int durationMinutes;
    private double caloriesBurned;
    private LocalDate activityDate;
    // Getters and Setters
    
    public FitnessActivity() {
		// TODO Auto-generated constructor stub
	}
    
	public FitnessActivity(Long id, Long userId, String activityType, int durationMinutes, int caloriesBurned,
			LocalDate activityDate) {
		super();
		this.id = id;
		this.userId = userId;
		this.activityType = activityType;
		this.durationMinutes = durationMinutes;
		this.caloriesBurned = caloriesBurned;
		this.activityDate = activityDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getActivityType() {
		return activityType;
	}

	public void setActivityType(String activityType) {
		this.activityType = activityType;
	}

	public int getDurationMinutes() {
		return durationMinutes;
	}

	public void setDurationMinutes(int durationMinutes) {
		this.durationMinutes = durationMinutes;
	}

	public double getCaloriesBurned() {
		return caloriesBurned;
	}

	public void setCaloriesBurned(double caloriesBurned) {
		this.caloriesBurned = caloriesBurned;
	}

	public LocalDate getActivityDate() {
		return activityDate;
	}

	public void setActivityDate(LocalDate date) {
		this.activityDate = date;
	}
    
}
