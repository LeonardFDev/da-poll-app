import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { DeleteButton } from "../delete-button/delete-button";
import { InputField } from "../input-field/input-field";
import { CheckBox } from "../check-box/check-box";
import { TertiaryButton } from "../tertiary-button/tertiary-button";
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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

  answerId:number = 0;
  answersList:WritableSignal<{'id':number}[]> = signal([]);

  ngAfterViewInit(){
    while (this.answersList().length < 2){
      this.addAnswear();
    }
  }

  fromNumberToChar(i:number){
    return String.fromCharCode(i+65);
  }

  addAnswear(){
    this.answerId++;

    const questions = this.qvService.questionform.get('questions') as FormArray;

    const question = questions.at(this.qvService.findOutIndex('questions', this.questionId)) as FormGroup;
    const answers = question.get('answers') as FormArray;

    answers.push(
      new FormGroup({
        'id': new FormControl(this.answerId),
        'answer': new FormControl('', [Validators.required]),
        'counter': new FormControl(0),
        'percentValue': new FormControl(0)
      })
    );

    console.log(answers.value);
    console.log(this.qvService.questionform.value);
    

    this.answersList.update(current => [...current, { 'id': this.answerId }]);
  }

  removeAnswear(id:number){
    // const questionsAndAnswers = this.qvService.questionform.get(`questionsAndAnswers${this.questionId}`) as FormGroup;

    // if(questionsAndAnswers.get(`answears${id}.answear`)?.value) questionsAndAnswers.get(`answears${id}.answear`)?.setValue('');

    // else if(this.answersList().length >2){
    //   if(questionsAndAnswers) questionsAndAnswers.removeControl(`answears${id}`);

    //   this.answersList.update(current => current.filter(item => item.id != id));
    // }
  }

  removeQuestion(){
    // this.action.emit(this.questionId);
  }
}
