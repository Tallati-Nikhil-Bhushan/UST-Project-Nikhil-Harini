import { Component, OnInit } from '@angular/core';
import { DietService } from '../diet.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent implements OnInit {
  totalCalories: number = 0;
  mealCalories: { [key: string]: number } = {};
  user = JSON.parse(localStorage.getItem('user') || '{}');
  dietaryPreference = this.user.dietaryPreference;

  vegPreference: any = {
    Breakfast: this.user.dietary_preference || false,
    Lunch: this.user.dietary_preference || false,
    Dinner: this.user.dietary_preference || false,
    Snacks: this.user.dietary_preference || false
  };

  constructor(private dietService: DietService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getCaloriesData().then(() => {
      this.fetchCurrentMealDetails();
    });
  }

  getCaloriesData(): Promise<void> {
    const userId = localStorage.getItem('userId');
    return new Promise((resolve, reject) => {
      this.dietService.getCaloriesByMeals(userId).subscribe(data => {
        this.totalCalories = data['totalCalories'];
        this.mealCalories = {
          'Breakfast': data.Breakfast,
          'Lunch': data['Lunch'],
          'Dinner': data['Dinner'],
          'Snacks': data['Snacks']
        };
        resolve();
      }, error => {
        console.error('Error fetching calories data', error);
        reject(error);
      });
    });
  }

  navigateToMealDetails(mealType: string): void {
    const calories = this.mealCalories[mealType].toString();
    const dietaryPreference = this.vegPreference[mealType] ? 'vegetarian' : '';

    if (mealType) {
      this.fetchMealDetails(mealType, calories, dietaryPreference);
    }
  }

  toggleVegetarian(mealType: string): void {
    this.vegPreference[mealType] = !this.vegPreference[mealType];
  }

  mealDetailsHtml: string | undefined;

  fetchMealDetails(mealType: string, calories: string, dietaryPreference: string): void {
    this.http.get(`http://localhost:8081/DietPlanner/api/diets/meals/${mealType}`, {
      params: {
        calories: calories.toString(),
        dietaryPreference: dietaryPreference
      },
      responseType: 'text'  // Expecting plain text (HTML) response
    }).subscribe(
      response => {
        this.mealDetailsHtml = response;
      },
      error => {
        console.error('Error fetching meal details', error);
      }
    );
  }

  getCurrentMealType(): string {
    const currentHour = new Date().getHours();
    
    if (currentHour >= 6 && currentHour < 11) {
      return 'Breakfast';
    } else if (currentHour >= 11 && currentHour < 16) {
      return 'Lunch';
    } else if (currentHour >= 19 && currentHour < 23) {
      return 'Dinner';
    } else {
      return 'Snacks';
    }
  }

  fetchCurrentMealDetails(): void {
    const currentMealType = this.getCurrentMealType();
    const calories = (this.mealCalories[currentMealType] || 500).toString();
    const dietaryPreference = this.vegPreference[currentMealType] ? 'vegetarian' : '';

    this.fetchMealDetails(currentMealType, calories, dietaryPreference);
  }
}
