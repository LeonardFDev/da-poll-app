import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { SurveyStatus } from "../../shared/components/survey-status/survey-status";
import { SecondaryButton } from "../../shared/components/secondary-button/secondary-button";
import { DeleteButton } from "../../shared/components/delete-button/delete-button";
import { InputField } from "../../shared/components/input-field/input-field";
import { CreateQuestion } from "../../shared/components/create-question/create-question";
import { PrimaryButton } from "../../shared/components/primary-button/primary-button";
import { DropDownMenu } from "../../shared/components/drop-down-menu/drop-down-menu";
import { QuestionValuesServices } from '../../shared/services/question-values/question-values';
import { SetQuestionsServices } from '../../shared/services/set-questions/set-questions';
import { AnswerInterface } from '../../shared/interfaces/answer';

@Component({
  selector: 'app-create-survey',
  imports: [SurveyStatus, SecondaryButton, DeleteButton, InputField, CreateQuestion, PrimaryButton, DropDownMenu, RouterLink, ReactiveFormsModule],
  templateUrl: './create-survey.html',
  styleUrl: './create-survey.scss',
})
export class CreateSurvey {
  qvService = inject(QuestionValuesServices);
  setQService = inject(SetQuestionsServices);

  surveyId = this.createSurveyId();

  questionId:number = 0;
  questionNumberList:WritableSignal<{id: number}[]> = signal([]);

  showOverlay = false;
  showOverlayBox = signal(false);

  get isErrorMessage(): boolean {
    return this.qvService.questionform.invalid && this.qvService.questionform.touched;
  }

  constructor(){
    this.setStartValues();
    this.addQuestion();
  }

  createSurveyId(){
    const list = this.setQService.questionsList();
    return list[list.length -1]?.id +1
  }

  listNumber(i:number){
    return i+1;
  }

  addQuestion(){
    this.questionId++;

    const questions = this.qvService.questionform.get(`questions`) as FormArray;
  
    if(questions){
      questions.push(
        new FormGroup({
          'id': new FormControl(this.questionId),
          'question': new FormControl('', [Validators.required]),
          'multipleAnswers': new FormControl(false),
          'answers': new FormArray([])
        })
      )
    }
    
    this.questionNumberList.update(current => [...current, { 'id': this.questionId }]);
  }

  removeQuestion(id:number){
    const question = this.qvService.getNameControlFromArray('questions', id, 'question');
    const multipleAnswers =this.qvService.getNameControlFromArray('questions', id, 'multipleAnswers');

    const answers = this.qvService.getFromArray('questions', id, 'answers');
    const isAnyAnswers = answers.value.some((group: AnswerInterface) => !!group.answer);

    if(question.value || multipleAnswers.value || isAnyAnswers) this.resetFields(question, multipleAnswers, answers);
    else if(this.questionNumberList().length >1) this.deleteFields(id);
  }

  resetFields(question:FormControl, multipleAnswers:FormControl, answers:FormArray){
    question.setValue('');
    question.markAsUntouched();
    multipleAnswers.setValue(false);
      
    answers.controls.forEach(item => {
      item.get('answer')?.setValue('');
      item.get('answer')?.markAsUntouched();
    });
  }

  deleteFields(id:number){
    const questionsArray = this.qvService.questionform.get('questions') as FormArray;
    const index = this.qvService.findOutIndex('questions',id);
    questionsArray.removeAt(index);

    this.questionNumberList.update(current => current.filter(item => item.id != id));
  }

  deleteInputField(value:string){
    if(this.qvService.nameControl(value).value){
      if(value == 'endDate') this.qvService.nameControl(value).setValue('No end date');
      else this.qvService.nameControl(value).setValue('');
    }
  }

  saveSurvey(){
    if (this.qvService.questionform.invalid) {
      this.qvService.questionform.markAllAsTouched();
      console.log(this.qvService.questionform.value);
    }
    else{
      if(!this.qvService.nameControl('description').value) this.qvService.nameControl('description').setValue('No description');
      this.qvService.nameControl('id').setValue(this.surveyId);
      const newSurvey = this.qvService.questionform.value
      this.setQService.questionsList.update(questionsList =>([...questionsList, newSurvey]));
      if(this.qvService.nameControl('description').value == 'No description') this.qvService.questionform.get('description')?.setValue('');

      this.showOverlay = true;
      setTimeout(() => this.showOverlayBox.set(true));
    }
  }

  setStartValues(){
    this.qvService.questionform.reset();

    this.qvService.questionform.get('id')?.setValue(0);
    this.qvService.questionform.get('name')?.setValue('');
    this.qvService.questionform.get('endDate')?.setValue('No end date');
    this.qvService.questionform.get('description')?.setValue('');
    this.qvService.questionform.get('category')?.setValue('No category');

    const questionsArray = this.qvService.questionform.get('questions') as FormArray;
    questionsArray.clear();
  }
}