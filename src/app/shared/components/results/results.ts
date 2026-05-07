import { Component, inject, Input } from '@angular/core';
import { QuestionInterFace } from '../../interfaces/question';
import { QuestionValuesServices } from '../../services/question-values/question-values';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
  qvService = inject(QuestionValuesServices);
  
  @Input() question!:QuestionInterFace;
  @Input() questionNumber!:number;
}


//html template: <app-results [question]="item" [questionId]="item.id" [questionName]="item.question"></app-results>