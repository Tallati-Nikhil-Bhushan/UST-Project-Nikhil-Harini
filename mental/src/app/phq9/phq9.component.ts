import { Component } from '@angular/core';
import { Phq9Service } from '../Phq9.service';
import { DepressionLevels } from '../depression-levels';

@Component({
  selector: 'app-phq9',
  templateUrl: './phq9.component.html',
  styleUrls: ['./phq9.component.css']
})
export class Phq9Component {
  questions = [
    'Little interest or pleasure in doing things?',
    'Feeling down, depressed, or hopeless?',
    'Trouble falling asleep, staying asleep, or sleeping too much?',
    'Feeling tired or having little energy?',
    'Poor appetite or overeating?',
    'Feeling bad about yourself - or that you’re a failure or have let yourself or your family down?',
    'Trouble concentrating on things, such as reading the newspaper or watching television?',
    'Moving or speaking so slowly that other people could have noticed? Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual?',
    'Thoughts that you would be better off dead or of hurting yourself in some way?'
  ];

  options = [
    { label: 'Not at all', score: 0 },
    { label: 'Several days', score: 1 },
    { label: 'More than half the days', score: 2 },
    { label: 'Nearly every day', score: 3 }
  ];

  answers = Array(this.questions.length).fill(null);
  hoveredOption = Array(this.questions.length).fill(null);
  showDialog = false;
  depressionLevel = '';
  depressionMessage = '';
  userId: number = 1; // Example user ID, adjust as needed

  constructor(private phq9Service: Phq9Service) {}

  selectOption(questionIndex: number, score: number) {
    this.answers[questionIndex] = score;
  }

  hoverOption(questionIndex: number, score: number | null) {
    this.hoveredOption[questionIndex] = score;
  }

  getOptionClass(questionIndex: number, score: number): string {
    if (this.answers[questionIndex] === score) {
      return this.getColorClass(score) + ' selected';
    } else if (this.hoveredOption[questionIndex] === score) {
      return this.getColorClass(score) + ' hovered';
    } else {
      return this.getColorClass(score);
    }
  }

  getColorClass(score: number): string {
    switch (score) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return '';
    }
  }

  submitForm() {
    this.phq9Service.submitAnswers(this.answers, this.userId)
      .subscribe((response: any) => {
        this.depressionLevel = response.depressionLevel;
        this.depressionMessage = DepressionLevels[this.depressionLevel] || 'Please consult a healthcare professional.';
        console.log('Server response:', response);
        console.log('Depression Level: ' + response.depressionLevel);

        this.showDialog = true; // Show the dialog
      }, (error: any) => {
        console.error('Error:', error);
      });
  }

  closeDialog() {
    this.showDialog = false;
  }
}
