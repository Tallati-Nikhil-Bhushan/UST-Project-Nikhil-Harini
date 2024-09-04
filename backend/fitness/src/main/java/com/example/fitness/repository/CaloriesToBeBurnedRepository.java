package com.example.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fitness.model.CaloriesToBeBurned;

public interface CaloriesToBeBurnedRepository extends JpaRepository<CaloriesToBeBurned, Long> {
	CaloriesToBeBurned findByUserId(Long userId);
}