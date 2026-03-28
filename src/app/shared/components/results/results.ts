import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { SurveyQuestionInterFace } from '../../interfaces/survey-question';
import { SurveyQuestionServices } from '../../services/survey-question';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
  serviesSQ = inject(SurveyQuestionServices)
  
  @Input() question!:SurveyQuestionInterFace;
  @Input() questionId!:number;
  @Input() questionName!:string;
}


//html template: <app-results [question]="item" [questionId]="item.id" [questionName]="item.question"></app-results>