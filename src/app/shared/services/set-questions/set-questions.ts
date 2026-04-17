import { Injectable, signal, WritableSignal } from '@angular/core';
import { SurveyQuestionInterFace } from '../../interfaces/survey-question';
import { AnswerInterface } from '../../interfaces/answer';
import { QuestionInterFace } from '../../interfaces/question';

@Injectable({
  providedIn: 'root',
})
export class SetQuestionsServices {
  questionsList = signal<SurveyQuestionInterFace[]>([]);

  placeholder:WritableSignal<SurveyQuestionInterFace> = signal(
    {
    'id': 0,
    'name': 'PLACEHOLDER_TITLE',
    'description': 'PLACEHOLDER_DESCRIPTION',
    'endDate': '01.01.2000',
    'category': 'PLACEHOLDER_CATEGORY',
    'questions': [
      {
        'id': 1,
        'question': '1. PLACEHOLDER_QUESTION',
        'checkboxType': 'checkbox',
        'answers': [
          { id: 1, 'enumeration': 'A', 'answer': 'PLACEHOLDER_ANSWER_1', 'counter': 0, 'percentValue': 0 },
          { id: 2, 'enumeration': 'B', 'answer': 'PLACEHOLDER_ANSWER_2', 'counter': 0, 'percentValue': 0 },
          { id: 3, 'enumeration': 'C', 'answer': 'PLACEHOLDER_ANSWER_3', 'counter': 0, 'percentValue': 0 },
          { id: 4, 'enumeration': 'D', 'answer': 'PLACEHOLDER_ANSWER_4', 'counter': 0, 'percentValue': 0 },
        ],
      },
      {
        'id': 2,
        'question': '2. PLACEHOLDER_QUESTION',
        'checkboxType': 'checkbox',
        'answers': [
          { id: 1, 'enumeration': 'A', 'answer': 'PLACEHOLDER_ANSWER_1', 'counter': 0, 'percentValue': 0 },
          { id: 2, 'enumeration': 'B', 'answer': 'PLACEHOLDER_ANSWER_2', 'counter': 0, 'percentValue': 0 },
          { id: 3, 'enumeration': 'C', 'answer': 'PLACEHOLDER_ANSWER_3', 'counter': 0, 'percentValue': 0 },
          { id: 4, 'enumeration': 'D', 'answer': 'PLACEHOLDER_ANSWER_4', 'counter': 0, 'percentValue': 0 },
        ],
      },
      {
        'id': 3,
        'question': '3. PLACEHOLDER_QUESTION',
        'checkboxType': 'radio',
        'answers': [
          { id: 1, 'enumeration': 'A', 'answer': 'PLACEHOLDER_ANSWER_1', 'counter': 0, 'percentValue': 0 },
          { id: 2, 'enumeration': 'B', 'answer': 'PLACEHOLDER_ANSWER_2', 'counter': 0, 'percentValue': 0 },
          { id: 3, 'enumeration': 'C', 'answer': 'PLACEHOLDER_ANSWER_3', 'counter': 0, 'percentValue': 0 },
          { id: 4, 'enumeration': 'D', 'answer': 'PLACEHOLDER_ANSWER_4', 'counter': 0, 'percentValue': 0 },
        ]
      },
      {
        'id': 4,
        'question': '4. PLACEHOLDER_QUESTION',
        'checkboxType': 'radio',
        'answers': [
          { id: 1, 'enumeration': 'A', 'answer': 'PLACEHOLDER_ANSWER_1', 'counter': 0, 'percentValue': 0 },
          { id: 2, 'enumeration': 'B', 'answer': 'PLACEHOLDER_ANSWER_2', 'counter': 0, 'percentValue': 0 },
          { id: 3, 'enumeration': 'C', 'answer': 'PLACEHOLDER_ANSWER_3', 'counter': 0, 'percentValue': 0 },
          { id: 4, 'enumeration': 'D', 'answer': 'PLACEHOLDER_ANSWER_4', 'counter': 0, 'percentValue': 0 },
        ]
      },
    ],
  });
    
  constructor(){
    this.questionsList.set([
      {
        'id': 1,
        'name':'Let’s Plan the Next Team Event Together',
        'description': 'We want to create team activities that everyone will enjoy – share your preferences and ideas in our survey to help us plan better experiences together.',
        'endDate': `${new Date().getDay()}.${new Date().getMonth()}.${new Date().getFullYear()}` ,
        'category': 'Team Activities',
        'questions': [
          {
            'id': 1,
            'question': '1. Which date would work best for you?',
            'checkboxType': 'checkbox',
            'answers': [
              {id:1, 'enumeration': 'A', 'answer':'19.09.2025, Friday', 'counter': 27, 'percentValue': 0},
              {id:2, 'enumeration': 'B', 'answer':'10.10.2025, Friday', 'counter': 44, 'percentValue': 0},
              {id:3, 'enumeration': 'C', 'answer':'11.10.2025, Saturday', 'counter': 3, 'percentValue': 0},
              {id:4, 'enumeration': 'D', 'answer':'31.10.2025, Friday', 'counter': 26, 'percentValue': 0},
            ],
          },
          {
            'id': 2,
            'question': '2. Choose the activities you prefer',
            'checkboxType': 'checkbox',
            'answers': [
              {id:1, 'enumeration': 'A', 'answer':'Outdoor adventure like kayaking', 'counter': 60, 'percentValue': 0},
              {id:2, 'enumeration': 'B', 'answer':'Office Costume Party', 'counter': 0, 'percentValue': 0},
              {id:3, 'enumeration': 'C', 'answer':'Bowling, mini-golf, volleyball', 'counter': 14, 'percentValue': 0},
              {id:4, 'enumeration': 'D', 'answer':'Beach party, Music & cocktails', 'counter': 26, 'percentValue': 0},
              {id:5, 'enumeration': 'E', 'answer':'Escape room', 'counter': 0, 'percentValue': 0},
            ]
          },
          {
            'id': 3,
            'question': '3. What\'s most important to you in a team event?',
            'checkboxType': 'radio',
            'answers': [
              {id:1, 'enumeration': 'A', 'answer':'Team bonding', 'counter': 44, 'percentValue': 0},
              {id:2, 'enumeration': 'B', 'answer':'Food and drinks, Friday', 'counter': 3, 'percentValue': 0},
              {id:3, 'enumeration': 'C', 'answer':'Trying something new', 'counter': 26, 'percentValue': 0},
              {id:4, 'enumeration': 'D', 'answer':'Keeping it low-key and stress-free', 'counter': 27, 'percentValue': 0},
            ]
          },
          {
            'id': 4,
            'question': '4. How long would you prefer the event to last?',
            'checkboxType': 'radio',
            'answers': [
              {id:1, 'enumeration': 'A', 'answer':'Half a day', 'counter': 14, 'percentValue': 0},
              {id:2, 'enumeration': 'B', 'answer':'Full day', 'counter': 86, 'percentValue': 0},
              {id:3, 'enumeration': 'C', 'answer':'Evening only, Saturday', 'counter': 0, 'percentValue': 0},
            ]
          },
        ],
      },
      {
        "id": 2,
        "name": "Improve Our Workplace Environment",
        "description": "Help us understand what changes would make your daily work experience better.",
        "endDate": "17.4.2026",
        "category": "Workplace",
        "questions": [
          {
            "id": 1,
            "question": "1. What should we improve first?",
            "checkboxType": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Office equipment","counter":12,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Communication","counter":34,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Workspace comfort","counter":22,"percentValue":0}
            ]
          },
          {
            "id": 2,
            "question": "2. Which benefits would you like?",
            "checkboxType": "checkbox",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Gym membership","counter":15,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Remote work options","counter":45,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Free snacks & drinks","counter":30,"percentValue":0},
              {"id":4,"enumeration":"D","answer":"Learning budget","counter":10,"percentValue":0}
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "Company Lunch Preferences",
        "description": "Tell us what kind of meals you prefer for team lunches.",
        "endDate": "17.4.2026",
        "category": "Food",
        "questions": [
          {
            "id": 1,
            "question": "1. Preferred cuisine?",
            "checkboxType": "checkbox",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Italian","counter":20,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Asian","counter":35,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Vegan","counter":10,"percentValue":0},
              {"id":4,"enumeration":"D","answer":"Local cuisine","counter":25,"percentValue":0}
            ]
          },
          {
            "id": 2,
            "question": "2. How often should we organize team lunches?",
            "checkboxType": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Weekly","counter":15,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Monthly","counter":50,"percentValue":0}
            ]
          }
        ]
      },
      {
        "id": 4,
        "name": "Remote Work Feedback",
        "description": "We want to optimize our remote work policy based on your feedback.",
        "endDate": "17.4.2026",
        "category": "Remote Work",
        "questions": [
          {
            "id": 1,
            "question": "1. How many days per week do you prefer to work remotely?",
            "checkboxType": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"1-2 days","counter":20,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"3-4 days","counter":40,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Fully remote","counter":25,"percentValue":0}
            ]
          },
          {
            "id": 2,
            "question": "2. What challenges do you face working remotely?",
            "checkboxType": "checkbox",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Communication","counter":30,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Isolation","counter":15,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Technical issues","counter":10,"percentValue":0},
              {"id":4,"enumeration":"D","answer":"Work-life balance","counter":20,"percentValue":0},
              {"id":5,"enumeration":"E","answer":"None","counter":5,"percentValue":0}
            ]
          }
        ]
      },
      {
        "id": 5,
        "name": "Learning & Development Survey",
        "description": "Help us shape future training and development opportunities.",
        "endDate": "17.4.2026",
        "category": "Education",
        "questions": [
          {
            "id": 1,
            "question": "1. Which topics interest you most?",
            "checkboxType": "checkbox",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Leadership","counter":18,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Technical skills","counter":42,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Soft skills","counter":25,"percentValue":0},
              {"id":4,"enumeration":"D","answer":"Project management","counter":15,"percentValue":0},
              {"id":5,"enumeration":"E","answer":"Languages","counter":8,"percentValue":0}
            ]
          },
          {
            "id": 2,
            "question": "2. Preferred learning format?",
            "checkboxType": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Workshops","counter":30,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Online courses","counter":40,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Mentoring","counter":20,"percentValue":0}
            ]
          }
        ]
      },
      {
        "id": 6,
        "name": "Office Events & Celebrations",
        "description": "Share your ideas for future office celebrations and events.",
        "endDate": "17.4.2026",
        "category": "Events",
        "questions": [
          {
            "id": 1,
            "question": "1. Which events would you enjoy?",
            "checkboxType": "checkbox",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Holiday parties","counter":35,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Team dinners","counter":28,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Outdoor picnics","counter":22,"percentValue":0},
              {"id":4,"enumeration":"D","answer":"Game nights","counter":15,"percentValue":0},
              {"id":5,"enumeration":"E","answer":"Workshops & talks","counter":10,"percentValue":0},
              {"id":6,"enumeration":"F","answer":"Charity events","counter":5,"percentValue":0}
            ]
          },
          {
            "id": 2,
            "question": "2. Preferred timing?",
            "checkboxType": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"During work hours","counter":20,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"After work","counter":50,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Weekend","counter":10,"percentValue":0}
            ]
          }
        ]
      }
    ]);

    this.calculatePercent();
  }

  calculatePercent(){
    this.questionsList.update(questionsList =>
      questionsList.map(question => ({
        ...question,
        questions: question.questions.map(question =>({
          ...question,
          answers: question.answers.map(answer => ({
            ...answer,
              percentValue: this.resultConditions(answer, question)
          }))
        }))
      }))
    );
  }

  resultConditions(answer:AnswerInterface, question:QuestionInterFace){
    if(answer.counter == 0) return 0;
    let value = (answer.counter / question.answers.reduce((sum, i) => sum + i.counter, 0) * 100);
    if(value == 0) return value;
    else return Number(value.toFixed(1));
  }
}
