import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {
  private apiUrl = 'http://localhost:8081/fitness/api';

  constructor(private http: HttpClient) {}

  getCaloriesBurnedLast30Days(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${userId}/calories-burned/last-30-days`);
  }

  getCaloriesBurnedLast7Days(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${userId}/calories-burned/last-7-days`);
  }

  getCaloriesBurnedLastDay(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${userId}/calories-burned/last-day`);
  }

  getCaloriesBurnedToday(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${userId}/calories-burned/today`);
  }

  getActivityHistory(): Observable<any[]> {
    let userId = localStorage.getItem("userId"); 
    return this.http.get<any[]>(`${this.apiUrl}/activity-history/${userId}`);
  }

  getTop10DatesByCaloriesBurned(): Observable<any[]> {
    let userId = localStorage.getItem("userId");
    return this.http.get<any[]>(`${this.apiUrl}/top-10-dates/${userId}`);
  }

  getLast10DaysActivity(): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.get<any>(`${this.apiUrl}/last-10-days/${userId}`);
  }

  getTopActivities(): Observable<any[]> {
    let userId = localStorage.getItem("userId");
    return this.http.get<any[]>(`${this.apiUrl}/top-activities/${userId}`);
  }

  getCaloriesToBeBurned(): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.get(`${this.apiUrl}/caloriesToBeBurned/${userId}`);
  }
}
