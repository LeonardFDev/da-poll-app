import { Injectable, signal } from '@angular/core';
import { SurveyQuestionInterFace } from '../interfaces/survey-question';

@Injectable({
  providedIn: 'root',
})
export class SurveyQuestionServices {
  questionsList = signal<SurveyQuestionInterFace[]>([]);

  constructor(){
    this.questionsList.set([
      {
        'id': 1,
        'name': 'überschrift',
        'question': '1. Choose the activities you prefer',
        'answers': [
          {'enumeration': 'A', 'answer':'19.09.2025, Friday', 'counter': 0},
          {'enumeration': 'B', 'answer':'10.10.2025, Friday', 'counter': 0},
          {'enumeration': 'C', 'answer':'11.10.2025, Saturday', 'counter': 0},
          {'enumeration': 'D', 'answer':'10.10.2025, Friday', 'counter': 0},
          {'enumeration': 'E', 'answer':'10.10.2027, Friday', 'counter': 0},
          {'enumeration': 'F', 'answer':'10.10.2030, Friday', 'counter': 0},
        ],
        checkboxType: 'checkbox',
        counter: 1,
      },

      {
        'id': 2,
        'name': 'überschrift',
        'question': '1. Choose the activities you prefer',
        'answers': [
          {'enumeration': 'G', 'answer':'19.09.2025, Friday', 'counter': 0},
          {'enumeration': 'H', 'answer':'10.10.2025, Friday', 'counter': 0},
          {'enumeration': 'I', 'answer':'11.10.2025, Saturday', 'counter': 0},
          {'enumeration': 'J', 'answer':'10.10.2025, Friday', 'counter': 0},
          {'enumeration': 'K', 'answer':'10.10.2027, Friday', 'counter': 0},
          {'enumeration': 'L', 'answer':'10.10.2030, Friday', 'counter': 0},
        ],
        checkboxType: 'radio',
        counter: 2,
      },

      {
        'id': 3,
        'name': 'überschrift',
        'question': '1. Choose the activities you prefer',
        'answers': [
          {'enumeration': 'M', 'answer':'19.09.2025, Friday', 'counter': 0},
          {'enumeration': 'N', 'answer':'10.10.2025, Friday', 'counter': 0},
          {'enumeration': 'O', 'answer':'11.10.2025, Saturday', 'counter': 0},
          {'enumeration': 'P', 'answer':'10.10.2025, Friday', 'counter': 0},
          {'enumeration': 'Q', 'answer':'10.10.2027, Friday', 'counter': 0},
          {'enumeration': 'R', 'answer':'10.10.2030, Friday', 'counter': 0},
        ],
        checkboxType: 'checkbox',
        counter: 3,
      },

      {
        'id': 4,
        'name': 'überschrift',
        'question': '1. Choose the activities you prefer',
        'answers': [
          {'enumeration': 'S', 'answer':'19.09.2025, Friday', 'counter': 0},
          {'enumeration': 'T', 'answer':'10.10.2025, Friday', 'counter': 0},
          {'enumeration': 'U', 'answer':'11.10.2025, Saturday', 'counter': 0},
          {'enumeration': 'V', 'answer':'10.10.2025, Friday', 'counter': 0},
          {'enumeration': 'W', 'answer':'10.10.2027, Friday', 'counter': 0},
          {'enumeration': 'X', 'answer':'10.10.2030, Friday', 'counter': 0},
        ],
        checkboxType: 'radio',
        counter: 4,
      },

    ]);
  }
}
