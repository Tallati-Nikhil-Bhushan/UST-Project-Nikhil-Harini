import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FitnessComponent } from '../fitness/fitness.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @ViewChild(FitnessComponent) targetComponent!: FitnessComponent;

  contentId = 0
  changeDashboardContent(index: number){
    this.contentId = index
  }

  triggerReloadInFitnessComponent() {
    if (this.targetComponent) {
      this.targetComponent.reloadData(); // Call the method in TargetComponent
    }
  }
}
