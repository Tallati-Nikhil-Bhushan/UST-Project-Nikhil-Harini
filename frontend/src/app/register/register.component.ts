import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = { username: '', email: '', password: '', age: null, gender: '', height: null, weight: null, activityLevel: 1, dietaryPreference: '' };
  usernameError: string | null = null;
  isUsernameAvailable: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.isUsernameAvailable) {
      this.authService.register(this.user).subscribe(
        response => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration failed:', error);
          this.usernameError = error.error.error || 'Registration failed';
        }
      );
    }
  }

  checkUsername(username: string) {
    if (username.length === 0) {
      this.isUsernameAvailable = false;
      this.usernameError = null;
      return;
    }

    this.authService.checkUsername(username).subscribe(
      response => {
        if (response.exists) {
          this.usernameError = 'Username is already taken';
          this.isUsernameAvailable = false;
        } else {
          this.usernameError = null;
          this.isUsernameAvailable = true;
        }
      },
      error => {
        console.error('Error checking username:', error);
        this.isUsernameAvailable = false;
      }
    );
  }
}
