import { Component, inject, Input } from '@angular/core';
import { QuestionInterFace } from '../../interfaces/question';
import { CreateSurveyService } from '../../services/create-survey/create-survey';
import { SurveyVotingService } from '../../services/survey-voting/survey-voting';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
  csService = inject(CreateSurveyService);
  svService = inject(SurveyVotingService);
  
  @Input() question!:QuestionInterFace;
  @Input() questionNumber!:number;

  valueOutput(value:number, index:number){
    const percentValue = this.svService.outputPercentValue(this.questionNumber -1, index);
    if(percentValue) return percentValue;
    else if(value) return value
    else return 0
  }
}


//html template: <app-results [question]="item" [questionId]="item.id" [questionName]="item.question"></app-results>