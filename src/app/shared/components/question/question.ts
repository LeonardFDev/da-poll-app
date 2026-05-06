import { Component, inject, Input } from '@angular/core';
import { Answear } from "../answear/answear";
import { QuestionInterFace } from '../../interfaces/question';
import { QuestionValuesServices } from '../../services/question-values/question-values';

@Component({
  selector: 'app-question',
  imports: [Answear],
  templateUrl: './question.html',
  styleUrl: './question.scss',
})
export class Question {
  qvService = inject(QuestionValuesServices);
  @Input() question!:QuestionInterFace
}
