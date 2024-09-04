package com.example.DietPlanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.DietPlanner.model.Diet;

public interface DietRepository extends JpaRepository<Diet, Long> {
    Diet findByUserId(Long userId);
}
