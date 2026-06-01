import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { SurveyQuestionInterFace } from '../../interfaces/survey-question';
import { QuestionInterFace } from '../../interfaces/question';
import { AnswerInterface } from '../../interfaces/answer';
import { GetSurveyDatabaseService } from '../get-survey-database/get-survey-database';

@Injectable({
  providedIn: 'root',
})
export class SurveyVotingService {
  gsdService = inject(GetSurveyDatabaseService);

  surveyQuestion: SurveyQuestionInterFace = this.gsdService.placeholder();
  answersCheckList!: FormArray<FormGroup>;

  surveyQuestionSignal:WritableSignal<SurveyQuestionInterFace> = this.gsdService.placeholder;
  answersCheckListSignal!:WritableSignal<FormArray<FormGroup>>;

  isSurveySubmitted = false;
  isAlreadyVotes = signal(false);

  liveCalculation(){
    if(this.isSurveySubmitted) return;
    this.surveyQuestionSignal = signal(this.surveyQuestion);
    this.answersCheckListSignal = signal(this.answersCheckList);

    this.currentQuestenUpdate('counter');
    this.currentQuestenUpdate('percent');
  }
  
  currentQuestenUpdate(valueUpdate: 'percent' | 'counter' | null = null){
    if(valueUpdate == null) return;
  
    this.surveyQuestionSignal.update(updateCounter => {
      const questions = [...updateCounter.questions];
      this.validateQuestions(valueUpdate, questions);
  
      return {
        ...updateCounter,
        'questions': questions
      };
    });
  }
  
  validateQuestions(valueUpdate: 'percent' | 'counter', questions: QuestionInterFace[]){
    for (let qIndex = 0; qIndex < questions.length; qIndex++) {
      const question = questions[qIndex];
      const answers = [...question.answers];
  
      this.validateAnswers(question, answers, qIndex, valueUpdate)
      questions[qIndex]= {
        ...question,
        'answers': answers
      };
    }
  }
  
  validateAnswers(question: QuestionInterFace, answers: AnswerInterface[], qIndex: number, valueUpdate: 'percent' | 'counter'){
    const answersFormArray = this.answersCheckListSignal().controls[qIndex].get('answers') as FormArray;
    
    for (let aIndex = 0; aIndex < answers.length; aIndex++) {
      const isChecked = answersFormArray.controls[aIndex].get('checked')?.value;
  
      this.counterUpdate(isChecked, valueUpdate, answers, aIndex);
      this.percentValueUpdate(valueUpdate, answers, aIndex, question)
    }
  }
  
  counterUpdate(isChecked:FormArray, valueUpdate: 'percent' | 'counter', answers: AnswerInterface[], aIndex:number){
    if(isChecked && valueUpdate == 'counter'){
      answers[aIndex] = {
        ...answers[aIndex],
        'counter': answers[aIndex].counter +1,
      };
    }
  }
  
  percentValueUpdate(valueUpdate: 'percent' | 'counter', answers: AnswerInterface[], aIndex:number, question: QuestionInterFace){
    if(valueUpdate == 'percent'){
      answers[aIndex] = {
        ...answers[aIndex],
        'percentValue' : this.resultConditions(answers[aIndex].counter, question.answers)
      };
    }
  }
  
  resultConditions(counter:number, answers:AnswerInterface[]){
    if(counter == 0) return 0;
    const value = (counter / answers.reduce((sum, i) => sum + i.counter, 0) * 100);
    if(value == 0) return value;
    else return Number(value.toFixed(1));
  }

  outputPercentValue(questionIndex:number, answerIndex:number){
    const percentValue = this.surveyQuestionSignal().questions[questionIndex].answers[answerIndex]?.percentValue;

    if(percentValue) return percentValue;
    else return 0;
  }

  alreadyVotes(){
    this.isAlreadyVotes.set(this.surveyQuestionSignal().questions
    .some(question => question.answers
    .some(answer => answer.counter > 0)));
  }
}
