package com.example.capstone.controller;

import com.example.capstone.model.Gad7Response;
import com.example.capstone.service.Gad7Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/MentalHealthApplication/api/gad7")
//@CrossOrigin("*")
public class Gad7Controller {

    @Autowired
    private Gad7Service gad7Service;

    @PostMapping("/submit")
    public ResponseEntity<Map<String, String>> submitResponse(@RequestBody Gad7Response response) {
        String anxietyLevel = gad7Service.calculateAnxietyLevel(response);

        Map<String, String> result = new HashMap<>();
        result.put("anxietyLevel", anxietyLevel);

        return ResponseEntity.ok(result);
    }
}
