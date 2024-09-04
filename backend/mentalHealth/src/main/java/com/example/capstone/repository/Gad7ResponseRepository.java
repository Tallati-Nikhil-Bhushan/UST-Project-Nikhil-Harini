package com.example.capstone.repository;

import com.example.capstone.model.Gad7Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Gad7ResponseRepository extends JpaRepository<Gad7Response, Long> {
}
