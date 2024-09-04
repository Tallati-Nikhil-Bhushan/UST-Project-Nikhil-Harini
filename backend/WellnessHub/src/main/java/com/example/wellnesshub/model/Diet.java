package com.example.wellnesshub.model;

public class Diet {
	private Long userId;
	private int caloriesIntake;
	private String dietaryPreference;
	
	public Diet() {
		// TODO Auto-generated constructor stub
	}
	
	public Diet(Long userId, int caloriesIntake, String dietaryPreference) {
		super();
		this.userId = userId;
		this.caloriesIntake = caloriesIntake;
		this.dietaryPreference = dietaryPreference;
	}
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public int getCaloriesIntake() {
		return caloriesIntake;
	}
	public void setCaloriesIntake(int caloriesIntake) {
		this.caloriesIntake = caloriesIntake;
	}
	public String getDietaryPreference() {
		return dietaryPreference;
	}
	public void setDietaryPreference(String dietaryPreference) {
		this.dietaryPreference = dietaryPreference;
	}
	
	
}