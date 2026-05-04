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

@Component({
  selector: 'app-create-survey',
  imports: [SurveyStatus, SecondaryButton, DeleteButton, InputField, CreateQuestion, PrimaryButton, DropDownMenu, RouterLink, ReactiveFormsModule],
  templateUrl: './create-survey.html',
  styleUrl: './create-survey.scss',
})
export class CreateSurvey {
  qvService = inject(QuestionValuesServices);
  setQService = inject(SetQuestionsServices);

  questionNumber:number = 0;
  questionNumberList:WritableSignal<{id: number}[]> = signal([]);

  constructor(){
    this.addQuestion();
  }

  listNumber(i:number){
    return i+1;
  }

  addQuestion(){
    this.questionNumber++;

    const questions = this.qvService.questionform.get(`questions`) as FormArray;
  
    if(questions){
      questions.push(
        new FormGroup({
          'id': new FormControl(this.questionNumber),
          'question': new FormControl('', [Validators.required]),
          'multipleAnswers': new FormControl(false),
          'answers': new FormArray([])
        })
      )
    }
    
    this.questionNumberList.update(current => [...current, { 'id': this.questionNumber }]);

    console.log(this.qvService.questionform.value);
  }

  removeQuestion(id:number){
    // if(this.qvService.questionform.get(`questionsAndAnswers${id}.question`)?.value || this.qvService.questionform.get(`questionsAndAnswers${id}.multipleAnswers`)?.value){
    //   this.qvService.questionform.get(`questionsAndAnswers${id}.question`)?.setValue('');
    //   this.qvService.questionform.get(`questionsAndAnswers${id}.multipleAnswers`)?.setValue(false);
    // } 

    // else if(this.questionNumberList().length >1){
    //   this.qvService.questionform.removeControl(`questionsAndAnswers${id}`);
    //   this.questionNumberList.update(current => current.filter(item => item.id != id));
    // } 

    // this.haveAnswersValue(id);
  }

  // haveAnswersValue(id:number){
  //   const currentQuestion = this.qvService.questionform.get(`questionsAndAnswers${id}`);
  //   if(currentQuestion){
  //     const answersList = Object.keys(currentQuestion?.value)
  //     .filter(key => key.startsWith('answear'));
      
  //     answersList.forEach(key => {
  //       const value = currentQuestion?.get(`${key}.answer`);
  //       if (value?.value)value.setValue('');
  //     });
  //   }
  // }

  deleteInputFeld(value:string){
    if(this.qvService.nameControl(value).value){
      if(value == 'endDate') this.qvService.nameControl(value).setValue('No end date');
      else this.qvService.nameControl(value).setValue('');
    }
  }

  saveSurvey(){
    if (this.qvService.questionform.invalid) {
      this.qvService.questionform.markAllAsTouched();
      console.log('Formular ungültig!');
    }
    else{
      if(!this.qvService.nameControl('description').value) this.qvService.nameControl('description').setValue('No description');
      this.qvService.nameControl('id').setValue(100);
      const test = this.qvService.questionform.value
      this.setQService.questionsList.update(questionsList =>({...questionsList, 19: test}))
      console.log(this.setQService.questionsList()[0]);
      console.log(this.setQService.questionsList()[19]);
      
      console.log('Alles gültig:', this.qvService.questionform.value);
    }
  }
}