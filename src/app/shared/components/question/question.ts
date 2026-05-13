import { Component, inject, Input } from '@angular/core';
import { Answear } from "../answear/answear";
import { QuestionInterFace } from '../../interfaces/question';
import { CreateSurveyService } from '../../services/create-survey/create-survey';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question',
  imports: [Answear],
  templateUrl: './question.html',
  styleUrl: './question.scss',
})
export class Question {
  csService = inject(CreateSurveyService);
  @Input() question!:QuestionInterFace;
  @Input() questionNumber!:number;
  @Input() questionAnswersView!:FormGroup;

  answersView(index:number){
    return (this.questionAnswersView.get('answears') as FormArray).controls[index].get('checked') as FormControl
  }
}
