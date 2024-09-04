package com.example.fitness.model;

import java.time.LocalDate;

public class DailyActivitySummary {

    private LocalDate activityDate;
    private double totalCaloriesBurned;
    private long totalDurationMinutes;

    // Constructor with parameters matching the JPQL query
    public DailyActivitySummary(LocalDate activityDate, double totalCaloriesBurned, long totalDurationMinutes) {
        this.activityDate = activityDate;
        this.totalCaloriesBurned = totalCaloriesBurned;
        this.totalDurationMinutes = totalDurationMinutes;
    }

    // Getters and setters
    public LocalDate getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(LocalDate activityDate) {
        this.activityDate = activityDate;
    }

    public double getTotalCaloriesBurned() {
        return totalCaloriesBurned;
    }

    public void setTotalCaloriesBurned(double totalCaloriesBurned) {
        this.totalCaloriesBurned = totalCaloriesBurned;
    }

    public long getTotalDurationMinutes() {
        return totalDurationMinutes;
    }

    public void setTotalDurationMinutes(long totalDurationMinutes) {
        this.totalDurationMinutes = totalDurationMinutes;
    }
}
