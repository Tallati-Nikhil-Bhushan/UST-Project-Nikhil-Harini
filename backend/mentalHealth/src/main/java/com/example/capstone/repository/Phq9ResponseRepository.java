package com.example.capstone.repository;

import com.example.capstone.model.Phq9Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Phq9ResponseRepository extends JpaRepository<Phq9Response, Long> {
}