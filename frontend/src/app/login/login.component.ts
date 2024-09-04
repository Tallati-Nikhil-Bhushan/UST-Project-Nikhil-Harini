import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  loginError: string | null = null;
  isAuthenticated: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.loginData).subscribe(
      () => {
        // Navigate to the dashboard after successful login
        this.router.navigate(['/dashboard']);
        this.isAuthenticated = true;
      },
      error => {
        console.error('Login failed:', error);
        this.loginError = 'Invalid username or password';
      }
    );
  }
}
