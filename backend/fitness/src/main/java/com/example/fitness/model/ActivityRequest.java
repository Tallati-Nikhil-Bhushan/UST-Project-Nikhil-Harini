package com.example.fitness.model;

import java.time.LocalDate;

public class ActivityRequest {
    private Long userId;
    private String activityType;
    private int duration;
    private double weightKg;
    private double heightCm;
    private int age;
    private LocalDate date;

    // Getters and Setters
    
    public ActivityRequest() {
		// TODO Auto-generated constructor stub
	}

	public ActivityRequest(Long userId, String activityType, int duration, double weightKg, double heightCm, int age,
			LocalDate date) {
		super();
		this.userId = userId;
		this.activityType = activityType;
		this.duration = duration;
		this.weightKg = weightKg;
		this.heightCm = heightCm;
		this.age = age;
		this.date = date;
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

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public double getWeightKg() {
		return weightKg;
	}

	public void setWeightKg(double weightKg) {
		this.weightKg = weightKg;
	}

	public double getHeightCm() {
		return heightCm;
	}

	public void setHeightCm(double heightCm) {
		this.heightCm = heightCm;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}
	
}
