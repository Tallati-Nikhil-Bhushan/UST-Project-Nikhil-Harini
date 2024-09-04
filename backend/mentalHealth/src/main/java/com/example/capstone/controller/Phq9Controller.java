package com.example.capstone.controller;

import com.example.capstone.model.Phq9Response;
import com.example.capstone.service.Phq9Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/MentalHealthApplication/api/phq9")
//@CrossOrigin(origins = "*")
public class Phq9Controller {

    @Autowired
    private Phq9Service phq9Service;

    @PostMapping("/submit")
    public ResponseEntity<Map<String, String>> submitResponse(@RequestBody Phq9Response response) {
        String depressionLevel = phq9Service.calculateDepressionLevel(response);

        // Prepare a JSON response
        Map<String, String> result = new HashMap<>();
        result.put("depressionLevel", depressionLevel);

        // Return the response entity with the JSON map
        return ResponseEntity.ok(result);
    }

}