import { Component, signal, WritableSignal } from '@angular/core';
import { SurveyStatus } from "../../shared/components/survey-status/survey-status";
import { SecondaryButton } from "../../shared/components/secondary-button/secondary-button";
import { DeleteButton } from "../../shared/components/delete-button/delete-button";
import { InputField } from "../../shared/components/input-field/input-field";
import { CreateQuestion } from "../../shared/components/create-question/create-question";
import { PrimaryButton } from "../../shared/components/primary-button/primary-button";
import { DropDownMenu } from "../../shared/components/drop-down-menu/drop-down-menu";
import { ISODate } from '../../shared/components/types/date.type';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-create-survey',
  imports: [SurveyStatus, SecondaryButton, DeleteButton, InputField, CreateQuestion, PrimaryButton, DropDownMenu, RouterLink],
  templateUrl: './create-survey.html',
  styleUrl: './create-survey.scss',
})
export class CreateSurvey {
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
    this.questionNumberList.update(current => [...current, { 'id': this.questionNumber }]);
  }

  removeQuestion(id:number){
    if(this.questionNumberList().length >1) this.questionNumberList.update(current => current.filter(item => item.id !== id));
  }
}
