import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.css']
})
export class LandComponent {

  constructor(private router: Router) {}

  navigateToPHQ9() {
    this.router.navigate(['/phq9']);
  }

  navigateToGAD7() {
    this.router.navigate(['/gad7']);
  }

  navigateToArticlesBlog() {
    this.router.navigate(['/articles-blog']);
  }

}
