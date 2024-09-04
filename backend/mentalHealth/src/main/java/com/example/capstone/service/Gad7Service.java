package com.example.capstone.service;

import com.example.capstone.model.Gad7Response;
import com.example.capstone.repository.Gad7ResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Gad7Service {

    @Autowired
    private Gad7ResponseRepository responseRepository;

    public String calculateAnxietyLevel(Gad7Response response) {
        int totalScore = response.getQuestion1() + response.getQuestion2() + response.getQuestion3() +
                response.getQuestion4() + response.getQuestion5() + response.getQuestion6() +
                response.getQuestion7();

        responseRepository.save(response);

        if (totalScore >= 0 && totalScore <= 4) {
            return "No Anxiety";
        } else if (totalScore >= 5 && totalScore <= 9) {
            return "Mild Anxiety";
        } else if (totalScore >= 10 && totalScore <= 14) {
            return "Moderate Anxiety";
        } else if (totalScore >= 15 && totalScore <= 21) {
            return "Severe Anxiety";
        } else {
            return "Invalid Score";
        }
    }
}
