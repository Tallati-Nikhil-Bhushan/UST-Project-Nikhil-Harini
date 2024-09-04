import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl = 'http://localhost:8081/fitness/api'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  addActivity(activityData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-activity`, activityData);
  }
}
