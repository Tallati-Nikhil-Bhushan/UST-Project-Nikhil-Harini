import { Component } from '@angular/core';
import { Gad7Service } from '../gad7.service';
import { AnxietyLevels } from '../anxiety-levels';

@Component({
  selector: 'app-gad7',
  templateUrl: './gad7.component.html',
  styleUrls: ['./gad7.component.css']
})
export class Gad7Component {
  questions = [
    'Feeling nervous, anxious, or on edge?',
    'Not being able to stop or control worrying?',
    'Worrying too much about different things?',
    'Trouble relaxing?',
    'Being so restless that it is hard to sit still?',
    'Becoming easily annoyed or irritable?',
    'Feeling afraid as if something awful might happen?'
  ];

  options = [
    { label: 'Not at all', score: 0 },
    { label: 'Several days', score: 1 },
    { label: 'More than half the days', score: 2 },
    { label: 'Nearly every day', score: 3 }
  ];

  answers = Array(this.questions.length).fill(null);
  hoveredOption = Array(this.questions.length).fill(null);
  userId: number = 1; // Example user ID, adjust as needed
showDialog: any;

  constructor(private gad7Service: Gad7Service) {}

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
    this.gad7Service.submitAnswers(this.answers, this.userId)
      .subscribe((response: any) => {
        const anxietyLevel = response.anxietyLevel;
        const anxietyMessage = AnxietyLevels[anxietyLevel];
        console.log('Server response:', response);
        console.log('Anxiety Level: ' + response.anxietyLevel);

        this.openAnxietyDialog(anxietyLevel, anxietyMessage);
      }, (error: any) => {
        console.error('Error:', error);
      });
  }

  openAnxietyDialog(anxietyLevel: string, anxietyMessage: string) {
    const dialogContainer = document.createElement('div');
    dialogContainer.classList.add('anxiety-dialog-container');

    const dialogComponent = document.createElement('app-anxiety-dialog');
    dialogComponent.setAttribute('anxietyLevel', anxietyLevel);
    dialogComponent.setAttribute('anxietyMessage', anxietyMessage);

    dialogContainer.appendChild(dialogComponent);
    document.body.appendChild(dialogContainer);
  }
}
