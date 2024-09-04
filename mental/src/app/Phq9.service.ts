// src/app/phq9.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Phq9Service {

  private apiUrl = 'http://localhost:8084/api/phq9/submit'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  submitAnswers(answers: number[], userId: number): Observable<any> {
    const response = {
      userId: userId,
      question1: answers[0] || 0,
      question2: answers[1] || 0,
      question3: answers[2] || 0,
      question4: answers[3] || 0,
      question5: answers[4] || 0,
      question6: answers[5] || 0,
      question7: answers[6] || 0,
      question8: answers[7] || 0,
      question9: answers[8] || 0
    };

    return this.http.post<any>(this.apiUrl, response);
  }
}
