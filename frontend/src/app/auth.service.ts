import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api';  // Your Spring Boot backend URL

  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());

  isLoggedIn = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(loginData: any): Observable<void> {
    return this.http.post<{ token: string, user: any}>(`${this.apiUrl}/login`, loginData).pipe(
      map(response => {
        // Store the JWT token in local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.user.id);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.loggedIn.next(true);
      })
    );
  }

  // To log out the user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
  }

  // To get the JWT token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  checkUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/check-username`, {
      params: { username }
    });
  }
}
