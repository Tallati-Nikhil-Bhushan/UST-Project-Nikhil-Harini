import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-depression-dialog',
  templateUrl: './depression-dialog.component.html',
  styleUrls: ['./depression-dialog.component.css']
})
export class DepressionDialogComponent implements OnInit {
  @Input() depressionLevel: string = '';
  @Input() depressionMessage: string = '';

  depressionImage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setDepressionImage();
  }

  setDepressionImage() {
    switch (this.depressionLevel) {
      case 'No Depression':
        this.depressionImage = 'assets/nodepp.png';
        break;
      case 'Mild Depression':
        this.depressionImage = 'assets/milddep.png';
        break;
      case 'Moderate Depression':
        this.depressionImage = 'assets/moder.png';
        break;
      case 'Moderate Severe Depression':
        this.depressionImage = 'assets/modseve.png';
        break;
      case 'Severe Depression':
        this.depressionImage = 'assets/severe.png';
        break;
      default:
        this.depressionImage = 'assets/default-image.png';
        break;
    }
  }

  closeDialog() {
    const dialogElement = document.querySelector('.depression-dialog-container');
    if (dialogElement) {
      dialogElement.remove();
    }
  }

  redirectToArticles() {
    this.router.navigate(['/articles-blog']);
  }
}
