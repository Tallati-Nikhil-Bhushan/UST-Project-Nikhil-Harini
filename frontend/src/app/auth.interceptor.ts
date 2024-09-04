import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    let cloned = req;
    if (token) {
      cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(cloned).pipe(
      catchError(error => {
        if (error.status === 401) {
          // Token might be expired, redirect to login
          this.router.navigate(['/login']);
        }
        throw error;
      })
    );
  }
}

