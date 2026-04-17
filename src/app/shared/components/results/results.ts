import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { SetQuestionsServices } from '../../services/set-questions/set-questions';
import { QuestionInterFace } from '../../interfaces/question';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
  serviesSQ = inject(SetQuestionsServices)
  
  @Input() question!:QuestionInterFace;
  @Input() questionId!:number;
  @Input() questionName!:QuestionInterFace[];
}


//html template: <app-results [question]="item" [questionId]="item.id" [questionName]="item.question"></app-results>