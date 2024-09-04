package com.example.fitness.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.fitness.model.ActivitySummary;
import com.example.fitness.model.DailyActivitySummary;
import com.example.fitness.model.FitnessActivity;

@Repository
public interface FitnessActivityRepository extends JpaRepository<FitnessActivity, Long> {
	
	@Query("SELECT COALESCE(SUM(f.caloriesBurned), 0) FROM FitnessActivity f WHERE f.userId = :userId AND f.activityDate BETWEEN :startDate AND :endDate")
    double getCaloriesBurned(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
	
	@Query("SELECT COALESCE(SUM(f.caloriesBurned), 0) FROM FitnessActivity f WHERE f.userId = :userId AND f.activityDate = :todayDate")
    double getCaloriesBurnedToday(@Param("userId") Long userId, @Param("todayDate") LocalDate todayDate);
	
	@Query("SELECT f FROM FitnessActivity f WHERE f.userId = :userId ORDER BY f.caloriesBurned DESC")
    List<FitnessActivity> findTop10ActivitiesByUserId(@Param("userId") Long userId, Pageable pageable);
	
	@Query("SELECT f.activityDate, SUM(f.caloriesBurned) as totalCalories, SUM(f.durationMinutes) as totalDuration " +
	           "FROM FitnessActivity f WHERE f.userId = :userId " +
	           "GROUP BY f.activityDate " +
	           "ORDER BY totalCalories DESC")
	List<Object[]> findTopDatesByCaloriesBurned(@Param("userId") Long userId, Pageable pageable);
	
	@Query("SELECT new com.example.fitness.model.DailyActivitySummary(f.activityDate, SUM(f.caloriesBurned), SUM(f.durationMinutes)) " +
		       "FROM FitnessActivity f WHERE f.userId = :userId AND f.activityDate >= :startDate " +
		       "GROUP BY f.activityDate ORDER BY f.activityDate DESC")
	List<DailyActivitySummary> getLast10DaysActivities(@Param("userId") Long userId, @Param("startDate") LocalDate startDate);
	
	@Query("SELECT new com.example.fitness.model.ActivitySummary(f.activityType, COUNT(f.activityType)) " +
		       "FROM FitnessActivity f WHERE f.userId = :userId GROUP BY f.activityType " +
		       "ORDER BY COUNT(f.activityType) DESC")
	List<ActivitySummary> findTopActivities(@Param("userId") Long userId, Pageable pageable);

	
	List<FitnessActivity> findByUserId(Long userId);
}
