import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anxiety-dialog',
  templateUrl: './anxiety-dialog.component.html',
  styleUrls: ['./anxiety-dialog.component.css']
})
export class AnxietyDialogComponent implements OnInit {
  @Input() anxietyLevel: string = '';
  @Input() anxietyMessage: string = '';

  anxietyImage: string = '';
  isDialogOpen = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.setAnxietyImage();
  }

  setAnxietyImage() {
    switch (this.anxietyLevel) {
      case 'No Anxiety':
        this.anxietyImage = 'assets/minimalanx.png';
        break;
      case 'Mild Anxiety':
        this.anxietyImage = 'assets/mildanx.png';
        break;
      case 'Moderate Anxiety':
        this.anxietyImage = 'assets/modanx.png';
        break;
      case 'Severe Anxiety':
        this.anxietyImage = 'assets/severeanx.png';
        break;
      default:
        this.anxietyImage = 'assets/default-image.png';
        break;
    }
  }

  closeDialog() {
    console.log("Hello");

    const dialogElement = document.querySelector('.anxiety-dialog');
    const overlayElement = document.querySelector('.anxiety-dialog-overlay');
    
    if (dialogElement) {
        dialogElement.remove();
    }
    if (overlayElement) {
        overlayElement.remove();
    }

    this.isDialogOpen = false;
  }

  redirectToArticles() {
    this.router.navigate(['/articles-blog']);
  }
}