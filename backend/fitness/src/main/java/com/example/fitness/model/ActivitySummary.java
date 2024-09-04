package com.example.fitness.model;

public class ActivitySummary {
    private String activityType;
    private Long count;

    // Constructor, getters, and setters
    
    public ActivitySummary() {
		// TODO Auto-generated constructor stub
	}

	public ActivitySummary(String activityType, Long count) {
		super();
		this.activityType = activityType;
		this.count = count;
	}

	public String getActivityType() {
		return activityType;
	}

	public void setActivityType(String activityType) {
		this.activityType = activityType;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}
    
    
}

