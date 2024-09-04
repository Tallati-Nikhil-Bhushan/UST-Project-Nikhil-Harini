package com.example.capstone.service;

import com.example.capstone.model.Phq9Response;
import com.example.capstone.repository.Phq9ResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Phq9Service {

    @Autowired
    private Phq9ResponseRepository responseRepository;

    public String calculateDepressionLevel(Phq9Response response) {
        int totalScore = response.getQuestion1() + response.getQuestion2() + response.getQuestion3() +
                response.getQuestion4() + response.getQuestion5() + response.getQuestion6() +
                response.getQuestion7() + response.getQuestion8() + response.getQuestion9();

        responseRepository.save(response);

        if (totalScore >= 0 && totalScore <= 4) {
            return "No Depression";
        } else if (totalScore >= 5 && totalScore <= 9) {
            return "Mild Depression";
        } else if (totalScore >= 10 && totalScore <= 14) {
            return "Moderate Depression";
        } else if (totalScore >= 15 && totalScore <= 19) {
            return "Moderately Severe Depression";
        } else if (totalScore >= 20 && totalScore <= 27) {
            return "Severe Depression";
        } else {
            return "Invalid Score";
        }
    }
}


