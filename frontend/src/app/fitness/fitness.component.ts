import { Component, OnInit, ViewChild } from '@angular/core';
import { FitnessService } from '../fitness.service';
import { Router } from '@angular/router';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';

@Component({
  selector: 'app-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.css']
})
export class FitnessComponent implements OnInit {
  userId: string | null = localStorage.getItem('userId');  // Assuming userId is stored in local storage
  caloriesLast30Days: number = 0;
  caloriesLast7Days: number = 0;
  caloriesLastDay: number = 0;
  caloriesToday: number = 0;
  targetCaloriesToBeBurned: number = 0;

  constructor(private fitnessService: FitnessService, private router: Router) {}

  @ViewChild(ActivityDetailsComponent) targetComponent!: ActivityDetailsComponent;

  ngOnInit(): void {
    if (this.userId) {
      this.fitnessService.getCaloriesBurnedLast30Days(this.userId).subscribe(data => this.caloriesLast30Days = data);
      this.fitnessService.getCaloriesBurnedLast7Days(this.userId).subscribe(data => this.caloriesLast7Days = data);
      this.fitnessService.getCaloriesBurnedLastDay(this.userId).subscribe(data => this.caloriesLastDay = data);
      this.fitnessService.getCaloriesBurnedToday(this.userId).subscribe(data => this.caloriesToday = data);

      this.fitnessService.getCaloriesToBeBurned().subscribe((response: any) => {
        this.targetCaloriesToBeBurned = response.caloriesToBeBurned;
      });
    }
  }

  navigateToAddActivity(): void {
    this.router.navigate(['/add-activity']);
  }

  showActivityHistory(): void {
    this.router.navigate(['/activity-details']);
  }

  calculateProgress(caloriesBurned: number): number {
    return (caloriesBurned / this.targetCaloriesToBeBurned) * 100;
  }

  calculateProgress7days(caloriesBurned: number): number {
    return (caloriesBurned / (this.targetCaloriesToBeBurned*7)) * 100;
  }

  calculateProgress30days(caloriesBurned: number): number {
    return (caloriesBurned / (this.targetCaloriesToBeBurned*30)) * 100;
  }

  reloadData() {
    this.ngOnInit();
    this.targetComponent.reloadData();
  }
}
