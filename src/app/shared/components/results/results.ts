import { Component, inject, Input } from '@angular/core';
import { QuestionInterFace } from '../../interfaces/question';
import { CreateSurveyService } from '../../services/create-survey/create-survey';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
  csService = inject(CreateSurveyService);
  
  @Input() question!:QuestionInterFace;
  @Input() questionNumber!:number;
}


//html template: <app-results [question]="item" [questionId]="item.id" [questionName]="item.question"></app-results>