import { computed, Injectable, signal } from '@angular/core';
import { SurveyQuestionInterFace } from '../interfaces/survey-question';
import { AnswerInterface } from '../interfaces/answer';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyQuestionServices {
  questionsList = signal<SurveyQuestionInterFace[]>([]);

  constructor(){
    this.questionsList.set([
      {
        'id': 1,
        'name':'name',
        'question': '1. Choose the activities you prefer',
        'answers': [
          {id:1, 'enumeration': 'A', 'answer':'19.09.2025, Friday', 'counter': 12, 'percentValue': 0},
          {id:2, 'enumeration': 'B', 'answer':'10.10.2025, Friday', 'counter': 7, 'percentValue': 0},
          {id:3, 'enumeration': 'C', 'answer':'11.10.2025, Saturday', 'counter': 9, 'percentValue': 0},
          {id:4, 'enumeration': 'D', 'answer':'10.10.2025, Friday', 'counter': 13, 'percentValue': 0},
          {id:5, 'enumeration': 'E', 'answer':'10.10.2027, Friday', 'counter': 16, 'percentValue': 0},
          {id:6, 'enumeration': 'F', 'answer':'10.10.2030, Friday', 'counter': 25, 'percentValue': 0},
        ],
        checkboxType: 'checkbox',
      },

      {
        'id': 2,
        'name':'name',
        'question': '2. Choose the activities you prefer',
        'answers': [
          {id:1, 'enumeration': 'G', 'answer':'19.09.2025, Friday', 'counter': 0, 'percentValue': 0},
          {id:2, 'enumeration': 'H', 'answer':'10.10.2025, Friday', 'counter': 87, 'percentValue': 0},
          {id:3, 'enumeration': 'I', 'answer':'11.10.2025, Saturday', 'counter': 0, 'percentValue': 0},
          {id:4, 'enumeration': 'J', 'answer':'10.10.2025, Friday', 'counter': 43, 'percentValue': 0},
          {id:5, 'enumeration': 'K', 'answer':'10.10.2027, Friday', 'counter': 0, 'percentValue': 0},
          {id:6, 'enumeration': 'L', 'answer':'10.10.2030, Friday', 'counter': 0, 'percentValue': 0},
        ],
        checkboxType: 'radio',
      },

      {
        'id': 3,
        'name':'name',
        'question': '3. Choose the activities you prefer',
        'answers': [
          {id:1, 'enumeration': 'M', 'answer':'19.09.2025, Friday', 'counter': 34, 'percentValue': 0},
          {id:2, 'enumeration': 'N', 'answer':'10.10.2025, Friday', 'counter': 46, 'percentValue': 0},
          // {id:3, 'enumeration': 'O', 'answer':'11.10.2025, Saturday', 'counter': 0, 'percentValue': 0},
          // {id:4, 'enumeration': 'P', 'answer':'10.10.2025, Friday', 'counter': 0, 'percentValue': 0},
          {id:5, 'enumeration': 'Q', 'answer':'10.10.2027, Friday', 'counter': 78, 'percentValue': 0},
          {id:6, 'enumeration': 'R', 'answer':'10.10.2030, Friday', 'counter': 34, 'percentValue': 0},
        ],
        checkboxType: 'checkbox',
      },

      {
        'id': 4,
        'name':'name',
        'question': '4. Choose the activities you prefer',
        'answers': [
          {id:1, 'enumeration': 'S', 'answer':'19.09.2025, Friday', 'counter': 0, 'percentValue': 0},
          {id:2, 'enumeration': 'T', 'answer':'10.10.2025, Friday', 'counter': 0, 'percentValue': 0},
          {id:3, 'enumeration': 'U', 'answer':'11.10.2025, Saturday', 'counter': 0, 'percentValue': 0},
          {id:4, 'enumeration': 'V', 'answer':'10.10.2025, Friday', 'counter': 0, 'percentValue': 0},
          {id:5, 'enumeration': 'W', 'answer':'10.10.2027, Friday', 'counter': 0, 'percentValue': 0},
          {id:6, 'enumeration': 'X', 'answer':'10.10.2030, Friday', 'counter': 0, 'percentValue': 0},
        ],
        checkboxType: 'radio',
      },
    ]);

    this.calculatePercent();
  }

  calculatePercent(){
    this.questionsList.update(questionsList =>
      questionsList.map(question => ({
        ...question,
        answers: question.answers.map(answer => ({
          ...answer,
            percentValue: this.resultConditions(answer, question)
        }))
      }))
    );
  }

  resultConditions(answer:AnswerInterface, question:SurveyQuestionInterFace){
    if(answer.counter == 0) return 0;
    let value = (answer.counter / question.answers.reduce((sum, i) => sum + i.counter, 0) * 100);
    if(value == 0) return value;
    else return Number(value.toFixed(1));
  }
}
