import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { DeleteButton } from "../delete-button/delete-button";
import { InputField } from "../input-field/input-field";
import { CheckBox } from "../check-box/check-box";
import { TertiaryButton } from "../tertiary-button/tertiary-button";
import { GetQuestionsServices } from '../../services/get-questions/get-questions';


@Component({
  selector: 'app-create-question',
  imports: [DeleteButton, InputField, CheckBox, TertiaryButton],
  templateUrl: './create-question.html',
  styleUrl: './create-question.scss',
})
export class CreateQuestion {
  @Input() questionId:number = NaN;
  @Input() questionIndex:number = NaN;

  @Output() action = new EventEmitter<number>();

  // getQuestionService = inject(GetQuestionsServices);

  answearId:number = 0;
  answearsList:WritableSignal<{'id':number}[]> = signal([]);

  constructor(){
    while (this.answearsList().length < 2){
      this.addAnswear();
    } 
  }

  fromNumberToChar(i:number){
    return String.fromCharCode(i+65);
  }

  addAnswear(){
    this.answearId++;
    this.answearsList.update(current => [...current, { 'id': this.answearId }]);
  }

  removeAnswear(id:number){
    if(this.answearsList().length >2) this.answearsList.update(current => current.filter(item => item.id !== id));
  }

  removeQuestion(questionId:number){
    this.action.emit(questionId);
  }
}
