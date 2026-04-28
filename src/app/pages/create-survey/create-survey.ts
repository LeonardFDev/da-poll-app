import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { SurveyStatus } from "../../shared/components/survey-status/survey-status";
import { SecondaryButton } from "../../shared/components/secondary-button/secondary-button";
import { DeleteButton } from "../../shared/components/delete-button/delete-button";
import { InputField } from "../../shared/components/input-field/input-field";
import { CreateQuestion } from "../../shared/components/create-question/create-question";
import { PrimaryButton } from "../../shared/components/primary-button/primary-button";
import { DropDownMenu } from "../../shared/components/drop-down-menu/drop-down-menu";
import { ISODate } from '../../shared/components/types/date.type';
import { QuestionValuesServices } from '../../shared/services/question-values/question-values';

@Component({
  selector: 'app-create-survey',
  imports: [SurveyStatus, SecondaryButton, DeleteButton, InputField, CreateQuestion, PrimaryButton, DropDownMenu, RouterLink, ReactiveFormsModule],
  templateUrl: './create-survey.html',
  styleUrl: './create-survey.scss',
})
export class CreateSurvey {
  qvService = inject(QuestionValuesServices);

  questionNumber:number = 0;
  questionNumberList:WritableSignal<{id: number}[]> = signal([]);

  endDate: 'No end date' | ISODate = 'No end date';

  constructor(){
    this.addQuestion();
  }

  listNumber(i:number){
    return i+1;
  }

  addQuestion(){
    this.questionNumber++;

    this.qvService.questionform.addControl(`questionsAndAnswers${this.questionNumber}`, new FormGroup({}));

    const questionsAndAnswers = this.qvService.questionform.get(`questionsAndAnswers${this.questionNumber}`) as FormGroup;
    if(questionsAndAnswers){
      questionsAndAnswers.addControl(`id`, new FormControl(`${this.questionNumber}`));
      questionsAndAnswers.addControl(`question`, new FormControl(`question${this.questionNumber}`));
      questionsAndAnswers.addControl(`multipleAnswers`, new FormControl(false));
    }
    
    this.questionNumberList.update(current => [...current, { 'id': this.questionNumber }]);

    setTimeout(() => {
      console.log(this.qvService.questionform.value);
    }, 200);
    
  }

  removeQuestion(id:number){
    if(this.questionNumberList().length >1){

      this.qvService.questionform.removeControl(`questionsAndAnswers${id}`);

      this.questionNumberList.update(current => current.filter(item => item.id != id));

      setTimeout(() => {
        console.log(this.qvService.questionform.value);
      }, 200);
    } 
  }
}