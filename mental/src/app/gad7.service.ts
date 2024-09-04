import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Gad7Service {
  private apiUrl = 'http://localhost:8084/api/gad7/submit'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  submitAnswers(answers: number[], userId: number): Observable<any> {
    const response = {
      userId: userId,
      question1: answers[0],
      question2: answers[1],
      question3: answers[2],
      question4: answers[3],
      question5: answers[4],
      question6: answers[5],
      question7: answers[6],
    };
    return this.http.post<any>(this.apiUrl, response);
  }
}
