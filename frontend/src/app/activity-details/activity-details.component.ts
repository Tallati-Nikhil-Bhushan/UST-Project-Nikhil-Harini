import { Component, OnInit } from '@angular/core';
import { FitnessService } from '../fitness.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {
  activities: any[] = []; // Replace `any` with the appropriate type
  topDates: any[] = [];
  last10daysactivities: any[] = [];
  last10daysnoActivities: boolean = false;
  noActivitiesMessage: string = '';
  topactivities: any[] = [];
  constructor(private fitnessService: FitnessService) {}

  ngOnInit(): void {
    this.fetchActivities();
  }

  fetchActivities(): void {
    this.fitnessService.getActivityHistory().subscribe((data: any[]) => {
      this.activities = data;
    });

    this.fitnessService.getTop10DatesByCaloriesBurned().subscribe(data => {
      this.topDates = data;
    });

    this.fitnessService.getLast10DaysActivity().subscribe(data => {
      this.last10daysactivities = data;
      this.last10daysnoActivities = this.activities.length === 0;
    });

    this.fitnessService.getTopActivities().subscribe(
      (data) => {
        if (data.length === 0) {
          this.noActivitiesMessage = 'No activities performed yet.';
        } else {
          this.topactivities = data;
          // console.log(this.topactivities);
        }
      },
      (error) => {
        console.error('Error fetching top activities', error);
      }
    );
  }
}
