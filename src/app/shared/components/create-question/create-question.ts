import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { DeleteButton } from "../delete-button/delete-button";
import { InputField } from "../input-field/input-field";
import { CheckBox } from "../check-box/check-box";
import { TertiaryButton } from "../tertiary-button/tertiary-button";
import { FormControl, FormGroup } from '@angular/forms';
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

  @Output() action = new EventEmitter<number>();

  answearId:number = 0;
  answearsList:WritableSignal<{'id':number}[]> = signal([]);

  ngAfterViewInit(){
    while (this.answearsList().length < 2){
      this.addAnswear();
    }
  }

  fromNumberToChar(i:number){
    return String.fromCharCode(i+65);
  }

  addAnswear(){
    this.answearId++;

    const questionsAndAnswers = this.qvService.questionform.get(`questionsAndAnswers${this.questionId}`) as FormGroup;
    if(questionsAndAnswers){
      
      questionsAndAnswers.addControl(`answears${this.answearId}`, new FormGroup({}));
      const answers = questionsAndAnswers.get(`answears${this.answearId}`) as FormGroup;
      if(answers){
        answers.addControl(`id`, new FormControl(`${this.answearId}`));
        answers.addControl(`answear`, new FormControl(`test ${this.answearId}`));
        answers.addControl(`counter`, new FormControl(0));
        answers.addControl(`percentValue`, new FormControl(0));
      }
    }

    this.answearsList.update(current => [...current, { 'id': this.answearId }]);
  }

  removeAnswear(id:number){
    const questionsAndAnswers = this.qvService.questionform.get(`questionsAndAnswers${this.questionId}`) as FormGroup;

    if(questionsAndAnswers.get(`answears${id}.answear`)?.value) questionsAndAnswers.get(`answears${id}.answear`)?.setValue('');

    else if(this.answearsList().length >2){
      if(questionsAndAnswers) questionsAndAnswers.removeControl(`answears${id}`);

      this.answearsList.update(current => current.filter(item => item.id != id));
    }
  }

  removeQuestion(){
    this.answearId = 0;
    this.action.emit(this.questionId);
  }
}
