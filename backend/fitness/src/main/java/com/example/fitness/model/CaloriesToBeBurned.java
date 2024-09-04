package com.example.fitness.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CaloriesToBeBurned {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	private Long userId;
	private int caloriesToBeBurned;
	private int activityLevel;
	
	public CaloriesToBeBurned() {
		// TODO Auto-generated constructor stub
	}

	public CaloriesToBeBurned(Long id, Long userId, int caloriesToBeBurned, int activityLevel) {
		super();
		this.id = id;
		this.userId = userId;
		this.caloriesToBeBurned = caloriesToBeBurned;
		this.activityLevel = activityLevel;
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
