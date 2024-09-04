import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularFrontend';
  isAuthenticated: boolean = false;
  isHomePage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkAuthStatus();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isHomePage = this.router.url === '/';
      });
  }

  checkAuthStatus(): void {
    if(this.authService.isAuthenticated()){
      this.isAuthenticated = true;
    };
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
