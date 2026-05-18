import { Injectable, signal, WritableSignal } from '@angular/core';
import { SurveyQuestionInterFace } from '../../interfaces/survey-question';
import { AnswerInterface } from '../../interfaces/answer';
import { QuestionInterFace } from '../../interfaces/question';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetSurveyDatabaseService {
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  surveyListInsertChannel!:RealtimeChannel;
  surveyListUpdateChannel!:RealtimeChannel;

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
        'question': 'PLACEHOLDER_QUESTION',
        'multipleAnswers': true,
        'answers': [
          { id: 1, 'answer': 'PLACEHOLDER_ANSWER_1', 'counter': 10, 'percentValue': 10 },
          { id: 2, 'answer': 'PLACEHOLDER_ANSWER_2', 'counter': 20, 'percentValue': 20 },
          { id: 3, 'answer': 'PLACEHOLDER_ANSWER_3', 'counter': 30, 'percentValue': 30 },
          { id: 4, 'answer': 'PLACEHOLDER_ANSWER_4', 'counter': 40, 'percentValue': 40 },
        ],
      },
      {
        'id': 2,
        'question': 'PLACEHOLDER_QUESTION',
        'multipleAnswers': true,
        'answers': [
          { id: 1, 'answer': 'PLACEHOLDER_ANSWER_1', 'counter': 40, 'percentValue': 40 },
          { id: 2, 'answer': 'PLACEHOLDER_ANSWER_2', 'counter': 30, 'percentValue': 30 },
          { id: 3, 'answer': 'PLACEHOLDER_ANSWER_3', 'counter': 20, 'percentValue': 20 },
          { id: 4, 'answer': 'PLACEHOLDER_ANSWER_4', 'counter': 10, 'percentValue': 10 },
        ],
      },
      {
        'id': 3,
        'question': 'PLACEHOLDER_QUESTION',
        'multipleAnswers': false,
        'answers': [
          { id: 1, 'answer': 'PLACEHOLDER_ANSWER_1', 'counter': 40, 'percentValue': 40 },
          { id: 2, 'answer': 'PLACEHOLDER_ANSWER_2', 'counter': 20, 'percentValue': 20 },
          { id: 3, 'answer': 'PLACEHOLDER_ANSWER_3', 'counter': 30, 'percentValue': 30 },
          { id: 4, 'answer': 'PLACEHOLDER_ANSWER_4', 'counter': 10, 'percentValue': 10 },
        ]
      },
      {
        'id': 4,
        'question': 'PLACEHOLDER_QUESTION',
        'multipleAnswers': false,
        'answers': [
          { id: 1, 'answer': 'PLACEHOLDER_ANSWER_1', 'counter': 10, 'percentValue': 10 },
          { id: 2, 'answer': 'PLACEHOLDER_ANSWER_2', 'counter': 30, 'percentValue': 30 },
          { id: 3, 'answer': 'PLACEHOLDER_ANSWER_3', 'counter': 20, 'percentValue': 20 },
          { id: 4, 'answer': 'PLACEHOLDER_ANSWER_4', 'counter': 40, 'percentValue': 40 },
        ]
      },
    ],
  });

  calculatePercent(){
    this.questionsList.update(questionsList =>
      questionsList.map(question => ({
        ...question,
        questions: question.questions.map(answers =>({
          ...answers,
          answers: answers.answers.map(answer => ({
            ...answer,
              percentValue: this.resultConditions(answer, answers)
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

  // insertChannel(){
  //   this.surveyListInsertChannel = this.supabase.channel('custom-insert-channel')
  //   .on(
  //     'postgres_changes',
  //     { event: 'INSERT', schema: 'public', table: 'survey-list' },
  //     (payload) => {
  //       // let tmpProduct = new ProductModel(payload.new)
  //       let tmpSurvey = payload.new<SurveyQuestionInterFace>
  //       // this.questionsList.update(list => [...list, tmpSurvey]);
  //       this.questionsList.update(list => [...list, tmpSurvey]);
  //     }
  //   )
  //   .subscribe()
  // }

  // updateChannel(){
  //   this.surveyListUpdateChannel = this.supabase.channel('custom-update-channel')
  //   .on(
  //     'postgres_changes',
  //     { event: 'UPDATE', schema: 'public', table: 'products' },
  //     (payload) => {
  //       let tmpProductId = payload.old['id'];
  //       let tmpUpdateProduct = new ProductModel(payload.new)
  //       this.productlist.update(list => list.filter(product => product.id != tmpProductId));
  //       this.productlist.update(list => [...list, tmpUpdateProduct]);
  //       this.productdetail.update(product => product = tmpUpdateProduct);
  //     }
  //   )
  //   .subscribe()
  // }

  ngOnDestroy(){
    this.supabase.removeChannel(this.surveyListInsertChannel);
    this.supabase.removeChannel(this.surveyListUpdateChannel);
  }

  async getAllProducts(){
    let response = await this.supabase
    .from('surveys-list')
    // .select('*');
    .select('id, name, description, endDate, category, questions');

    this.questionsList.set((response.data ?? []) as SurveyQuestionInterFace[]);
  }

  async addProduct(product:SurveyQuestionInterFace){
    const product_data = product;
    const response = await this.supabase
    .from('survey-lists')
    .insert([product_data])
    .select();
  }

  // async editProduct(id:number, product:ProductModel){
  //     const product_data = product.getCleanUpdateJson();
  //     const response = await this.supabase
  //     .from('products')
  //     .update([product_data])
  //     .eq('id', id)
  //     .select()
  //   }

  // async deleteProduct(id:number){
  //   const { error } = await this.supabase
  //   .from('products')
  //   .delete()
  //   .eq('id', id)
  // }

  // async setproductDetailById(id:number){
  //   await this.getAllProducts();
  //   let tmpProduct = this.productlist().find(product => product.id == id);
  //   if(tmpProduct) this.productdetail.set(tmpProduct);
  // }

  // async setproductEditById(id:number){
  //   await this.getAllProducts();
  //   let tmpProduct = this.productlist().find(product => product.id == id);
  //   return tmpProduct; 
  // }

  // async ngOnInit(){
  //   await this.getAllProducts();
  // }

  // async ngAfterViewInit(){
  //   await this.getAllProducts();
  // }
    
  constructor(){
    this.getAllProducts();
    // console.log(this.supabase);

    // this.insertChannel();
    // this.updateChannel();
    
    // this.questionsList.set([
    //   {
    //     'id': 1,
    //     'name':'Let’s Plan the Next Team Event Together',
    //     'description': 'We want to create team activities that everyone will enjoy – share your preferences and ideas in our survey to help us plan better experiences together.',
    //     'endDate': `${new Intl.DateTimeFormat('en-CA').format(new Date())}`,
    //     'category': 'Team Activities',
    //     'questions': [
    //       {
    //         'id': 1,
    //         'question': 'Which date would work best for you?',
    //         'multipleAnswers': true,
    //         'answers': [
    //           {id:1, 'answer':'19.09.2025, Friday', 'counter': 27, 'percentValue': 0},
    //           {id:2, 'answer':'10.10.2025, Friday', 'counter': 44, 'percentValue': 0},
    //           {id:3, 'answer':'11.10.2025, Saturday', 'counter': 3, 'percentValue': 0},
    //           {id:4, 'answer':'31.10.2025, Friday', 'counter': 26, 'percentValue': 0},
    //         ],
    //       },
    //       {
    //         'id': 2,
    //         'question': 'Choose the activities you prefer',
    //         'multipleAnswers': true,
    //         'answers': [
    //           {id:1, 'answer':'Outdoor adventure like kayaking', 'counter': 60, 'percentValue': 0},
    //           {id:2, 'answer':'Office Costume Party', 'counter': 0, 'percentValue': 0},
    //           {id:3, 'answer':'Bowling, mini-golf, volleyball', 'counter': 14, 'percentValue': 0},
    //           {id:4, 'answer':'Beach party, Music & cocktails', 'counter': 26, 'percentValue': 0},
    //           {id:5, 'answer':'Escape room', 'counter': 0, 'percentValue': 0},
    //         ]
    //       },
    //       {
    //         'id': 3,
    //         'question': 'What\'s most important to you in a team event?',
    //         'multipleAnswers': false,
    //         'answers': [
    //           {id:1, 'answer':'Team bonding', 'counter': 44, 'percentValue': 0},
    //           {id:2, 'answer':'Food and drinks, Friday', 'counter': 3, 'percentValue': 0},
    //           {id:3, 'answer':'Trying something new', 'counter': 26, 'percentValue': 0},
    //           {id:4, 'answer':'Keeping it low-key and stress-free', 'counter': 27, 'percentValue': 0},
    //         ]
    //       },
    //       {
    //         'id': 4,
    //         'question': 'How long would you prefer the event to last?',
    //         'multipleAnswers': false,
    //         'answers': [
    //           {id:1, 'answer':'Half a day', 'counter': 14, 'percentValue': 0},
    //           {id:2, 'answer':'Full day', 'counter': 86, 'percentValue': 0},
    //           {id:3, 'answer':'Evening only, Saturday', 'counter': 0, 'percentValue': 0},
    //         ]
    //       },
    //     ],
    //   },
    //   {
    //     "id": 2,
    //     "name": "Improve Our Workplace Environment",
    //     "description": "Help us understand what changes would make your daily work experience better.",
    //     "endDate": "No end date",
    //     "category": "Lifestyle & Preferences",
    //     "questions": [
    //       {
    //         "id": 1,
    //         "question": "What should we improve first?",
    //         "multipleAnswers": false,
    //         "answers": [
    //           {"id":1, "answer":"Office equipment","counter":12,"percentValue":0},
    //           {"id":2, "answer":"Communication","counter":34,"percentValue":0},
    //           {"id":3, "answer":"Workspace comfort","counter":22,"percentValue":0}
    //         ]
    //       },
    //       {
    //         "id": 2,
    //         "question": "Which benefits would you like?",
    //         "multipleAnswers": true,
    //         "answers": [
    //           {"id":1, "answer":"Gym membership","counter":15,"percentValue":0},
    //           {"id":2, "answer":"Remote work options","counter":45,"percentValue":0},
    //           {"id":3, "answer":"Free snacks & drinks","counter":30,"percentValue":0},
    //           {"id":4, "answer":"Learning budget","counter":10,"percentValue":0}
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "id": 3,
    //     "name": "Company Lunch Preferences",
    //     "description": "Tell us what kind of meals you prefer for team lunches.",
    //     "endDate": "2028-04-17",
    //     "category": "Health & Wellness",
    //     "questions": [
    //       {
    //         "id": 1,
    //         "question": "Preferred cuisine?",
    //         "multipleAnswers": true,
    //         "answers": [
    //           {"id":1, "answer":"Italian","counter":20,"percentValue":0},
    //           {"id":2, "answer":"Asian","counter":35,"percentValue":0},
    //           {"id":3, "answer":"Vegan","counter":10,"percentValue":0},
    //           {"id":4, "answer":"Local cuisine","counter":25,"percentValue":0}
    //         ]
    //       },
    //       {
    //         "id": 2,
    //         "question": "How often should we organize team lunches?",
    //         "multipleAnswers": false,
    //         "answers": [
    //           {"id":1, "answer":"Weekly","counter":15,"percentValue":0},
    //           {"id":2, "answer":"Monthly","counter":50,"percentValue":0}
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "id": 4,
    //     "name": "Remote Work Feedback",
    //     "description": "We want to optimize our remote work policy based on your feedback.",
    //     "endDate": "2026-07-17",
    //     "category": "Technology & Innovation",
    //     "questions": [
    //       {
    //         "id": 1,
    //         "question": "How many days per week do you prefer to work remotely?",
    //         "multipleAnswers": false,
    //         "answers": [
    //           {"id":1, "answer":"1-2 days","counter":20,"percentValue":0},
    //           {"id":2, "answer":"3-4 days","counter":40,"percentValue":0},
    //           {"id":3, "answer":"Fully remote","counter":25,"percentValue":0}
    //         ]
    //       },
    //       {
    //         "id": 2,
    //         "question": "What challenges do you face working remotely?",
    //         "multipleAnswers": true,
    //         "answers": [
    //           {"id":1, "answer":"Communication","counter":30,"percentValue":0},
    //           {"id":2, "answer":"Isolation","counter":15,"percentValue":0},
    //           {"id":3, "answer":"Technical issues","counter":10,"percentValue":0},
    //           {"id":4, "answer":"Work-life balance","counter":20,"percentValue":0},
    //           {"id":5, "answer":"None","counter":5,"percentValue":0}
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "id": 5,
    //     "name": "Learning & Development Survey",
    //     "description": "Help us shape future training and development opportunities.",
    //     "endDate": "2013-04-17",
    //     "category": "Education & Learning",
    //     "questions": [
    //       {
    //         "id": 1,
    //         "question": "Which topics interest you most?",
    //         "multipleAnswers": true,
    //         "answers": [
    //           {"id":1, "answer":"Leadership","counter":18,"percentValue":0},
    //           {"id":2, "answer":"Technical skills","counter":42,"percentValue":0},
    //           {"id":3, "answer":"Soft skills","counter":25,"percentValue":0},
    //           {"id":4, "answer":"Project management","counter":15,"percentValue":0},
    //           {"id":5, "answer":"Languages","counter":8,"percentValue":0}
    //         ]
    //       },
    //       {
    //         "id": 2,
    //         "question": "Preferred learning format?",
    //         "multipleAnswers": false,
    //         "answers": [
    //           {"id":1, "answer":"Workshops","counter":30,"percentValue":0},
    //           {"id":2, "answer":"Online courses","counter":40,"percentValue":0},
    //           {"id":3, "answer":"Mentoring","counter":20,"percentValue":0}
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "id": 6,
    //     "name": "Office Events & Celebrations",
    //     "description": "Share your ideas for future office celebrations and events.",
    //     "endDate": "2006-04-17",
    //     "category": "Team Activities",
    //     "questions": [
    //       {
    //         "id": 1,
    //         "question": "Which events would you enjoy?",
    //         "multipleAnswers": true,
    //         "answers": [
    //           {"id":1, "answer":"Holiday parties","counter":35,"percentValue":0},
    //           {"id":2, "answer":"Team dinners","counter":28,"percentValue":0},
    //           {"id":3, "answer":"Outdoor picnics","counter":22,"percentValue":0},
    //           {"id":4, "answer":"Game nights","counter":15,"percentValue":0},
    //           {"id":5, "answer":"Workshops & talks","counter":10,"percentValue":0},
    //           {"id":6, "answer":"Charity events","counter":5,"percentValue":0}
    //         ]
    //       },
    //       {
    //         "id": 2,
    //         "question": "Preferred timing?",
    //         "multipleAnswers": false,
    //         "answers": [
    //           {"id":1, "answer":"During work hours","counter":20,"percentValue":0},
    //           {"id":2, "answer":"After work","counter":50,"percentValue":0},
    //           {"id":3, "answer":"Weekend","counter":10,"percentValue":0}
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "id": 7,
    //     "name": "Team Building Activities",
    //     "description": "What team building activities would you like to participate in?",
    //     "endDate": "2026-12-31",
    //     "category": "Team Activities",
    //     "questions": [
    //       {
    //         "id": 1,
    //         "question": "Which activity do you prefer?",
    //         "multipleAnswers": false,
    //         "answers": [
    //           {"id":1, "answer":"Escape Room","counter":25,"percentValue":0},
    //           {"id":2, "answer":"Cooking Class","counter":20,"percentValue":0},
    //           {"id":3, "answer":"Sports Day","counter":30,"percentValue":0}
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "id": 8,
    //     "name": "Wellness Program Feedback",
    //     "description": "How can we improve our wellness programs?",
    //     "endDate": "2027-06-30",
    //     "category": "Health & Wellness",
    //     "questions": [
    //       {
    //         "id": 1,
    //         "question": "Which wellness activities do you use?",
    //         "multipleAnswers": true,
    //         "answers": [
    //           {"id":1, "answer":"Yoga Classes","counter":18,"percentValue":0},
    //           {"id":2, "answer":"Meditation Sessions","counter":12,"percentValue":0},
    //           {"id":3, "answer":"Gym Access","counter":25,"percentValue":0}
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "id": 9,
    //     "name": "Gaming Tournament Interest",
    //     "description": "Which gaming tournaments would you like to see in the office?",
    //     "endDate": "2026-11-15",
    //     "category": "Gaming & Entertainment",
    //     "questions": [
    //       {
    //         "id": 1,
    //         "question": "Which game would you play?",
    //         "multipleAnswers": true,
    //         "answers": [
    //           {"id":1, "answer":"FIFA","counter":20,"percentValue":0},
    //           {"id":2, "answer":"League of Legends","counter":15,"percentValue":0},
    //           {"id":3, "answer":"Chess","counter":10,"percentValue":0}
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "id": 10,
    //     "name": "Entertainment Preferences",
    //     "description": "What kind of entertainment do you enjoy during breaks?",
    //     "endDate": "2026-10-31",
    //     "category": "Gaming & Entertainment",
    //     "questions": [
    //       {
    //         "id": 1,
    //         "question": "What do you prefer?",
    //         "multipleAnswers": false,
    //         "answers": [
    //           {"id":1, "answer":"Board Games","counter":15,"percentValue":0},
    //           {"id":2, "answer":"Video Games","counter":25,"percentValue":0},
    //           {"id":3, "answer":"Music","counter":10,"percentValue":0}
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "id": 11,
    //     "name": "Book Club Survey",
    //     "description": "What kind of books would you like to read in our book club?",
    //     "endDate": "2026-09-30",
    //     "category": "Education & Learning",
    //     "questions": [
    //       {
    //         "id": 1,
    //         "question": "Which genre do you prefer?",
    //         "multipleAnswers": true,
    //         "answers": [
    //           {"id":1, "answer":"Fiction","counter":20,"percentValue":0},
    //           {"id":2, "answer":"Non-Fiction","counter":15,"percentValue":0},
    //           {"id":3, "answer":"Biographies","counter":10,"percentValue":0}
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "id": 12,
    //     "name": "Work-Life Balance Survey",
    //     "description": "How can we support your work-life balance?",
    //     "endDate": "2026-08-31",
    //     "category": "Lifestyle & Preferences",
    //     "questions": [
    //       {
    //         "id": 1,
    //         "question": "What helps you most?",
    //         "multipleAnswers": false,
    //         "answers": [
    //           {"id":1, "answer":"Flexible Hours","counter":30,"percentValue":0},
    //           {"id":2, "answer":"Home Office","counter":40,"percentValue":0},
    //           {"id":3, "answer":"Childcare Support","counter":10,"percentValue":0}
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "id": 13,
    //     "name": "New Tech Tools Survey",
    //     "description": "Which new tools would improve your productivity?",
    //     "endDate": "2026-12-31",
    //     "category": "Technology & Innovation",
    //     "questions": [
    //       {
    //         "id": 1,
    //         "question": "Which tool do you need?",
    //         "multipleAnswers": true,
    //         "answers": [
    //           {"id":1, "answer":"AI Assistant","counter":25,"percentValue":0},
    //           {"id":2, "answer":"Project Management Software","counter":30,"percentValue":0},
    //           {"id":3, "answer":"Cloud Storage","counter":20,"percentValue":0}
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "id": 14,
    //     "name": "General Feedback",
    //     "description": "Any other feedback or suggestions?",
    //     "endDate": "No end date",
    //     "category": "No category",
    //     "questions": [
    //       {
    //         "id": 1,
    //         "question": "Your feedback",
    //         "multipleAnswers": false,
    //         "answers": [
    //           {"id":1, "answer":"Everything worked well.","counter":25,"percentValue":0},
    //           {"id":2, "answer":"Could be improved.","counter":25,"percentValue":0},
    //           {"id":3, "answer":"Loved it!","counter":25,"percentValue":0},
    //           {"id":4, "answer":"The process was clear.","counter":25,"percentValue":0},
    //           {"id":5, "answer":"Pretty smooth experience.","counter":25,"percentValue":0},
    //           {"id":6, "answer":"I would recommend it.","counter":25,"percentValue":0},
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "id": 15,
    //     "name": "Miscellaneous Ideas",
    //     "description": "Share any ideas you have for the company.",
    //     "endDate": "No end date",
    //     "category": "No category",
    //     "questions": [
    //       {
    //         "id": 1,
    //         "question": "Your idea",
    //         "multipleAnswers": false,
    //         "answers": [
    //           {"id":1, "answer":"Add a dark mode option.","counter":25,"percentValue":0},
    //           {"id":2, "answer":"Improve the mobile experience.","counter":25,"percentValue":0},
    //           {"id":3, "answer":"More customization would be great.","counter":25,"percentValue":0},
    //           {"id":4, "answer":"Make navigation simpler.","counter":25,"percentValue":0},
    //           {"id":5, "answer":"Add more tutorials or tips.","counter":25,"percentValue":0},
    //           {"id":6, "answer":"Faster loading times would help.","counter":25,"percentValue":0},
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     'id': 16,
    //     'name':'Let’s Plan the Next Team Event Together',
    //     'description': 'We want to create team activities that everyone will enjoy – share your preferences and ideas in our survey to help us plan better experiences together.',
    //     'endDate': `${new Intl.DateTimeFormat('en-CA').format(new Date())}`,
    //     'category': 'Team Activities',
    //     'questions': [
    //       {
    //         'id': 1,
    //         'question': 'Which date would work best for you?',
    //         'multipleAnswers': true,
    //         'answers': [
    //           {id:1, 'answer':'19.09.2025, Friday', 'counter': 0, 'percentValue': 0},
    //           {id:2, 'answer':'10.10.2025, Friday', 'counter': 0, 'percentValue': 0},
    //           {id:3, 'answer':'11.10.2025, Saturday', 'counter': 0, 'percentValue': 0},
    //           {id:4, 'answer':'31.10.2025, Friday', 'counter': 0, 'percentValue': 0},
    //         ],
    //       },
    //       {
    //         'id': 2,
    //         'question': 'Choose the activities you prefer',
    //         'multipleAnswers': true,
    //         'answers': [
    //           {id:1, 'answer':'Outdoor adventure like kayaking', 'counter': 0, 'percentValue': 0},
    //           {id:2, 'answer':'Office Costume Party', 'counter': 0, 'percentValue': 0},
    //           {id:3, 'answer':'Bowling, mini-golf, volleyball', 'counter': 0, 'percentValue': 0},
    //           {id:4, 'answer':'Beach party, Music & cocktails', 'counter': 0, 'percentValue': 0},
    //           {id:5, 'answer':'Escape room', 'counter': 0, 'percentValue': 0},
    //         ]
    //       },
    //       {
    //         'id': 3,
    //         'question': 'What\'s most important to you in a team event?',
    //         'multipleAnswers': false,
    //         'answers': [
    //           {id:1, 'answer':'Team bonding', 'counter': 0, 'percentValue': 0},
    //           {id:2, 'answer':'Food and drinks, Friday', 'counter': 0, 'percentValue': 0},
    //           {id:3, 'answer':'Trying something new', 'counter': 0, 'percentValue': 0},
    //           {id:4, 'answer':'Keeping it low-key and stress-free', 'counter': 0, 'percentValue': 0},
    //         ]
    //       },
    //       {
    //         'id': 4,
    //         'question': 'How long would you prefer the event to last?',
    //         'multipleAnswers': false,
    //         'answers': [
    //           {id:1, 'answer':'Half a day', 'counter': 0, 'percentValue': 0},
    //           {id:2, 'answer':'Full day', 'counter': 0, 'percentValue': 0},
    //           {id:3, 'answer':'Evening only, Saturday', 'counter': 0, 'percentValue': 0},
    //         ]
    //       },
    //     ],
    //   },
    // ]);
      
    // this.calculatePercent();
  }
}
