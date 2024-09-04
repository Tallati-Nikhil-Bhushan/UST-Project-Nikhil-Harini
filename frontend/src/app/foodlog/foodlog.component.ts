import { Component } from '@angular/core';
import { NutritionService } from '../nutrition.service';

@Component({
  selector: 'app-foodlog',
  templateUrl: './foodlog.component.html',
  styleUrls: ['./foodlog.component.css']
})
export class FoodlogComponent {
  userInput: string = '';
  nutrientData: any = null;
  errorMessage: string | null = null;

  constructor(private nutritionService: NutritionService) { }

  submitQuery() {
    this.nutritionService.getNutrients(this.userInput)
      .subscribe(
        data => {
          this.nutrientData = data.foods[0];  // Handle the successful response
          console.log(data);
          this.errorMessage = null;  // Clear any previous error messages
        },
        error => {
          this.errorMessage = error;  // Set the error message for display
          this.nutrientData = null;   // Clear nutrient data in case of an error
        }
      );
  }
}
