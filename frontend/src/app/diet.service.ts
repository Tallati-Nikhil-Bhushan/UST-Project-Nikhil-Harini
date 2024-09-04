import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietService {
  private apiUrl = 'http://localhost:8081/DietPlanner/api/diets';

  constructor(private http: HttpClient) {}

  getCaloriesByMeals(userId: string | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}/meals`);
  }
}
