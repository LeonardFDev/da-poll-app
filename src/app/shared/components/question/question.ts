import { Component, Input } from '@angular/core';
import { Answear } from "../answear/answear";
import { SurveyQuestionInterFace } from '../../interfaces/survey-question';

@Component({
  selector: 'app-question',
  imports: [Answear],
  templateUrl: './question.html',
  styleUrl: './question.scss',
})
export class Question {
  @Input() question!:SurveyQuestionInterFace
}
