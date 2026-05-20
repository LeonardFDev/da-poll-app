import { Injectable, signal, WritableSignal } from '@angular/core';
import { SurveyQuestionInterFace } from '../../interfaces/survey-question';
import { AnswerInterface } from '../../interfaces/answer';
import { QuestionInterFace } from '../../interfaces/question';
import { createClient, RealtimeChannel, RealtimePostgresUpdatePayload } from '@supabase/supabase-js';
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

  constructor(){
    this.getAllSurveys();

    this.insertChannel();
    this.updateChannel();
  }

  async getAllSurveys(){
    let response = await this.supabase
    .from('surveys-list')
    .select('id, name, description, endDate, category, questions');

    this.questionsList.set((response.data ?? []) as SurveyQuestionInterFace[]);
    this.calculatePercent();
  }

  insertChannel(){
    this.surveyListInsertChannel = this.supabase.channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'surveys-list' },
      (payload) => {
        const data = payload.new as SurveyQuestionInterFace
        const tempSurvey = this.getCleanAddJsonWithId(payload.new['id'], data)
        this.questionsList.update(list => [...list, tempSurvey]);
      }
    )
    .subscribe()
  }

  updateChannel(){
    this.surveyListUpdateChannel = this.supabase.channel('custom-update-channel')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'surveys-list' },
      (payload) => {
        this.processPayload(payload);
      }
    )
    .subscribe()
  }

  processPayload(payload:RealtimePostgresUpdatePayload<{[key: string]: any;}>){
    const tempSurveytId = payload.old['id'];
    const data = payload.new as SurveyQuestionInterFace
    const tempUpdateSurvey = this.getCleanAddJsonWithId(tempSurveytId, data)
        
    this.questionsList.update(list => list.filter(survey => survey.id != tempSurveytId));
    this.questionsList.update(list => [...list, tempUpdateSurvey]);

    this.calculatePercent();
  }

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

  ngOnDestroy(){
    this.supabase.removeChannel(this.surveyListInsertChannel);
    this.supabase.removeChannel(this.surveyListUpdateChannel);
  }

  async updateSurvey(currentId:number, updateSurvey:QuestionInterFace[]){
    const response = await this.supabase
    .from('surveys-list')
    .update({ questions: updateSurvey })
    .eq('id', currentId)
    .select()
  }

  async addSurvey(survey:SurveyQuestionInterFace){
    const survey_data = this.getCleanAddJson(survey);
    const response = await this.supabase
    .from('surveys-list')
    .insert([survey_data])
    .select()
    .single(); 
    
    return response.data.id; 
  }

  getCleanAddJson(survey:SurveyQuestionInterFace){
    return{
      name: survey.name,
      description: survey.description,
      endDate: survey.endDate,
      category: survey.category,
      questions: survey.questions,
    }
  }

  getCleanAddJsonWithId(surveyId:number, survey:SurveyQuestionInterFace){
    return{
      id: surveyId,
      name: survey.name,
      description: survey.description,
      endDate: survey.endDate,
      category: survey.category,
      questions: survey.questions,
    }
  }
}
