import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from '../activity.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent {
  activityType: string = '';
  duration: number = 0;
  date: string = '';
  maxDate: string = new Date().toISOString().split('T')[0];
  successMessage: string = ''; // Variable to hold the success message
  activityTypes: string[] = [
    'Running',
    'Walking',
    'Swimming',
    'Cycling',
    'Yoga',
    'Weightlifting',
    'Hiking',
    'Dancing',
    'Aerobics',
    'Pilates',
    'Tennis',
    'Basketball',
    'Soccer',
    'Rowing',
    'Elliptical Trainer',
    'Jumping Rope',
    'Kickboxing',
    'Martial Arts',
    'Zumba',
    'Stair Climbing',
    'Golfing',
    'Surfing',
    'Skateboarding',
    'Rock Climbing',
    'Skiing',
    'Snowboarding',
    'Ice Skating',
    'Rollerblading',
    'Gardening',
    'House Cleaning',
    'Carrying Groceries',
    'Mowing the Lawn',
    'Shoveling Snow'
  ];

  constructor(private http: HttpClient, private router: Router,private activityService: ActivityService, private parent: DashboardComponent) {}

  ngOnInit(): void {
    this.maxDate = new Date().toISOString().split('T')[0]; // Set maxDate to today's date
  }

  addActivity() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in');
      return;
    }
  
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const date = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
  
    const requestBody = {
      userId: userId,
      activityType: this.activityType,
      duration: this.duration,
      weightKg: user.weight,
      heightCm: user.height,
      age: user.age,
      date: this.date
    };
  
    this.activityService.addActivity(requestBody).subscribe(
      response => {
        console.log('Activity added successfully:', response);
        // Handle success response
        this.successMessage = 'Activity added successfully!';
        // Optionally, reset the form
        this.activityType = '';
        this.duration = 0;
        this.date = '';
        this.parent.triggerReloadInFitnessComponent();
      },
      error => {
        console.error('Error adding activity:', error);
        // Handle error response
        this.successMessage = 'Failed to add activity. Please try again.';
      }
    );
  }
  
}
