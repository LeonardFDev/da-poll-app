import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { DeleteButton } from "../delete-button/delete-button";
import { InputField } from "../input-field/input-field";
import { CheckBox } from "../check-box/check-box";
import { TertiaryButton } from "../tertiary-button/tertiary-button";
import { FormControl } from '@angular/forms';
import { QuestionValuesServices } from '../../services/question-values/question-values';

@Component({
  selector: 'app-create-question',
  imports: [DeleteButton, InputField, CheckBox, TertiaryButton],
  templateUrl: './create-question.html',
  styleUrl: './create-question.scss',
})
export class CreateQuestion {
  qvService = inject(QuestionValuesServices);

  @Input() questionId:number = NaN;
  @Input() questionNumber:number = NaN;
  @Input() nameControl:FormControl = this.qvService.nameControl('name');

  @Output() action = new EventEmitter<number>();

  answearId:number = 0;
  answearsList:WritableSignal<{'id':number}[]> = signal([]);

  ngAfterViewInit(){
    while (this.answearsList().length < 2){
      console.log(this.questionNumber);
      
      this.addAnswear();
    }
  }

  fromNumberToChar(i:number){
    return String.fromCharCode(i+65);
  }

  addAnswear(){
    this.qvService.questionform.addControl(`answear${this.questionNumber}${this.fromNumberToChar(this.answearId)}`, new FormControl(`answear${this.questionNumber}${this.fromNumberToChar(this.answearId)}`));
    this.answearId++;
    this.answearsList.update(current => [...current, { 'id': this.answearId }]);
    console.log(this.qvService.questionform.value);
    console.log(this.questionId);
    console.log(this.questionNumber);
  }

  removeAnswear(id:number){
    if(this.answearsList().length >2){
      this.answearId--;
      this.qvService.questionform.removeControl(`answear${this.questionNumber}${this.fromNumberToChar(this.answearId)}`);
      this.answearsList.update(current => current.filter(item => item.id != id));
      console.log(this.qvService.questionform.value);
    } 
  }

  removeQuestion(questionId:number){
    this.answearId = 0;
    this.action.emit(questionId);
  }
}
