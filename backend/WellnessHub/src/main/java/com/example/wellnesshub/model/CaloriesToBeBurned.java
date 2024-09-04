package com.example.wellnesshub.model;

public class CaloriesToBeBurned {
	private Long userId;
	private int caloriesToBeBurned;
	private int activityLevel;
	
	public CaloriesToBeBurned() {
		// TODO Auto-generated constructor stub
	}

	public CaloriesToBeBurned(Long userId, int caloriesToBeBurned, int activityLevel) {
		super();
		this.userId = userId;
		this.caloriesToBeBurned = caloriesToBeBurned;
		this.activityLevel = activityLevel;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public int getCaloriesToBeBurned() {
		return caloriesToBeBurned;
	}

	public void setCaloriesToBeBurned(int caloriesToBeBurned) {
		this.caloriesToBeBurned = caloriesToBeBurned;
	}

	public int getActivityLevel() {
		return activityLevel;
	}

	public void setActivityLevel(int activityLevel) {
		this.activityLevel = activityLevel;
	}
	
	
}
