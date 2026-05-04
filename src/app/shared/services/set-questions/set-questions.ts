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
    'endDate': '2000-01-01',
    'category': 'PLACEHOLDER_CATEGORY',
    'questions': [
      {
        'id': 1,
        'question': '1. PLACEHOLDER_QUESTION',
        'multipleAnswers': 'checkbox',
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
        'multipleAnswers': 'checkbox',
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
        'multipleAnswers': 'radio',
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
        'multipleAnswers': 'radio',
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
        'endDate': `${new Intl.DateTimeFormat('en-CA').format(new Date())}`,
        'category': 'Team Activities',
        'questions': [
          {
            'id': 1,
            'question': '1. Which date would work best for you?',
            'multipleAnswers': 'checkbox',
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
            'multipleAnswers': 'checkbox',
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
            'multipleAnswers': 'radio',
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
            'multipleAnswers': 'radio',
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
        "endDate": "No end date",
        "category": "Lifestyle & Preferences",
        "questions": [
          {
            "id": 1,
            "question": "1. What should we improve first?",
            "multipleAnswers": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Office equipment","counter":12,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Communication","counter":34,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Workspace comfort","counter":22,"percentValue":0}
            ]
          },
          {
            "id": 2,
            "question": "2. Which benefits would you like?",
            "multipleAnswers": "checkbox",
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
        "endDate": "2028-04-17",
        "category": "Health & Wellness",
        "questions": [
          {
            "id": 1,
            "question": "1. Preferred cuisine?",
            "multipleAnswers": "checkbox",
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
            "multipleAnswers": "radio",
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
        "endDate": "2026-07-17",
        "category": "Technology & Innovation",
        "questions": [
          {
            "id": 1,
            "question": "1. How many days per week do you prefer to work remotely?",
            "multipleAnswers": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"1-2 days","counter":20,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"3-4 days","counter":40,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Fully remote","counter":25,"percentValue":0}
            ]
          },
          {
            "id": 2,
            "question": "2. What challenges do you face working remotely?",
            "multipleAnswers": "checkbox",
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
        "endDate": "2013-04-17",
        "category": "Education & Learning",
        "questions": [
          {
            "id": 1,
            "question": "1. Which topics interest you most?",
            "multipleAnswers": "checkbox",
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
            "multipleAnswers": "radio",
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
        "endDate": "2006-04-17",
        "category": "Team Activities",
        "questions": [
          {
            "id": 1,
            "question": "1. Which events would you enjoy?",
            "multipleAnswers": "checkbox",
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
            "multipleAnswers": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"During work hours","counter":20,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"After work","counter":50,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Weekend","counter":10,"percentValue":0}
            ]
          }
        ]
      },
      {
        "id": 7,
        "name": "Team Building Activities",
        "description": "What team building activities would you like to participate in?",
        "endDate": "2026-12-31",
        "category": "Team Activities",
        "questions": [
          {
            "id": 1,
            "question": "1. Which activity do you prefer?",
            "multipleAnswers": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Escape Room","counter":25,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Cooking Class","counter":20,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Sports Day","counter":30,"percentValue":0}
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "Company Lunch Preferences",
        "description": "Tell us what kind of meals you prefer for team lunches.",
        "endDate": "2028-04-17",
        "category": "Health & Wellness",
        "questions": [
          {
            "id": 1,
            "question": "1. Preferred cuisine?",
            "multipleAnswers": "checkbox",
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
            "multipleAnswers": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Weekly","counter":15,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Monthly","counter":50,"percentValue":0}
            ]
          }
        ]
      },
      {
        "id": 8,
        "name": "Wellness Program Feedback",
        "description": "How can we improve our wellness programs?",
        "endDate": "2027-06-30",
        "category": "Health & Wellness",
        "questions": [
          {
            "id": 1,
            "question": "1. Which wellness activities do you use?",
            "multipleAnswers": "checkbox",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Yoga Classes","counter":18,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Meditation Sessions","counter":12,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Gym Access","counter":25,"percentValue":0}
            ]
          }
        ]
      },
      {
        "id": 9,
        "name": "Gaming Tournament Interest",
        "description": "Which gaming tournaments would you like to see in the office?",
        "endDate": "2026-11-15",
        "category": "Gaming & Entertainment",
        "questions": [
          {
            "id": 1,
            "question": "1. Which game would you play?",
            "multipleAnswers": "checkbox",
            "answers": [
              {"id":1,"enumeration":"A","answer":"FIFA","counter":20,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"League of Legends","counter":15,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Chess","counter":10,"percentValue":0}
            ]
          }
        ]
      },
      {
        "id": 10,
        "name": "Entertainment Preferences",
        "description": "What kind of entertainment do you enjoy during breaks?",
        "endDate": "2026-10-31",
        "category": "Gaming & Entertainment",
        "questions": [
          {
            "id": 1,
            "question": "1. What do you prefer?",
            "multipleAnswers": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Board Games","counter":15,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Video Games","counter":25,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Music","counter":10,"percentValue":0}
            ]
          }
        ]
      },
      {
        "id": 5,
        "name": "Learning & Development Survey",
        "description": "Help us shape future training and development opportunities.",
        "endDate": "2013-04-17",
        "category": "Education & Learning",
        "questions": [
          {
            "id": 1,
            "question": "1. Which topics interest you most?",
            "multipleAnswers": "checkbox",
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
            "multipleAnswers": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Workshops","counter":30,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Online courses","counter":40,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Mentoring","counter":20,"percentValue":0}
            ]
          }
        ]
      },
      {
        "id": 11,
        "name": "Book Club Survey",
        "description": "What kind of books would you like to read in our book club?",
        "endDate": "2026-09-30",
        "category": "Education & Learning",
        "questions": [
          {
            "id": 1,
            "question": "1. Which genre do you prefer?",
            "multipleAnswers": "checkbox",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Fiction","counter":20,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Non-Fiction","counter":15,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Biographies","counter":10,"percentValue":0}
            ]
          }
        ]
      },
      {
        "id": 2,
        "name": "Improve Our Workplace Environment",
        "description": "Help us understand what changes would make your daily work experience better.",
        "endDate": "No end date",
        "category": "Lifestyle & Preferences",
        "questions": [
          {
            "id": 1,
            "question": "1. What should we improve first?",
            "multipleAnswers": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Office equipment","counter":12,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Communication","counter":34,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Workspace comfort","counter":22,"percentValue":0}
            ]
          },
          {
            "id": 2,
            "question": "2. Which benefits would you like?",
            "multipleAnswers": "checkbox",
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
        "id": 12,
        "name": "Work-Life Balance Survey",
        "description": "How can we support your work-life balance?",
        "endDate": "2026-08-31",
        "category": "Lifestyle & Preferences",
        "questions": [
          {
            "id": 1,
            "question": "1. What helps you most?",
            "multipleAnswers": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"Flexible Hours","counter":30,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Home Office","counter":40,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Childcare Support","counter":10,"percentValue":0}
            ]
          }
        ]
      },
      {
        "id": 4,
        "name": "Remote Work Feedback",
        "description": "We want to optimize our remote work policy based on your feedback.",
        "endDate": "2026-07-17",
        "category": "Technology & Innovation",
        "questions": [
          {
            "id": 1,
            "question": "1. How many days per week do you prefer to work remotely?",
            "multipleAnswers": "radio",
            "answers": [
              {"id":1,"enumeration":"A","answer":"1-2 days","counter":20,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"3-4 days","counter":40,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Fully remote","counter":25,"percentValue":0}
            ]
          },
          {
            "id": 2,
            "question": "2. What challenges do you face working remotely?",
            "multipleAnswers": "checkbox",
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
        "id": 13,
        "name": "New Tech Tools Survey",
        "description": "Which new tools would improve your productivity?",
        "endDate": "2026-12-31",
        "category": "Technology & Innovation",
        "questions": [
          {
            "id": 1,
            "question": "1. Which tool do you need?",
            "multipleAnswers": "checkbox",
            "answers": [
              {"id":1,"enumeration":"A","answer":"AI Assistant","counter":25,"percentValue":0},
              {"id":2,"enumeration":"B","answer":"Project Management Software","counter":30,"percentValue":0},
              {"id":3,"enumeration":"C","answer":"Cloud Storage","counter":20,"percentValue":0}
            ]
          }
        ]
      },
      {
        "id": 14,
        "name": "General Feedback",
        "description": "Any other feedback or suggestions?",
        "endDate": "No end date",
        "category": "No category",
        "questions": [
          {
            "id": 1,
            "question": "1. Your feedback",
            "multipleAnswers": "checkbox",
            "answers": []
          }
        ]
      },
      {
        "id": 15,
        "name": "Miscellaneous Ideas",
        "description": "Share any ideas you have for the company.",
        "endDate": "No end date",
        "category": "No category",
        "questions": [
          {
            "id": 1,
            "question": "1. Your idea",
            "multipleAnswers": "radio",
            "answers": []
          }
        ]
      },
      // {
      //   category: "No category",
      //   description: "test describing",
      //   endDate: "No end date",
      //   id: 100,
      //   name: "test name",
      //   questions: [
      //     {
      //       answers: [
      //         {answer: "Answears A", counter: 0, id: 1, percentValue: 0},
      //         {answer: "Answears B", counter: 0, id: 2, percentValue: 0}
      //       ],
      //       id: 1,
      //       multipleAnswers: false,
      //       question: "question 1"
      //     }
      //   ]
      // }
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
