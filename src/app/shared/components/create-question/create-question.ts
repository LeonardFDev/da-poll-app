import { Component, inject, Input, output, signal, WritableSignal } from '@angular/core';
import { DeleteButton } from "../delete-button/delete-button";
import { InputField } from "../input-field/input-field";
import { CheckBox } from "../check-box/check-box";
import { TertiaryButton } from "../tertiary-button/tertiary-button";
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateSurveyService } from '../../services/create-survey/create-survey';
import { noWhitespaceValidator } from '../../validators/no-whitespace';

@Component({
  selector: 'app-create-question',
  imports: [DeleteButton, InputField, CheckBox, TertiaryButton],
  templateUrl: './create-question.html',
  styleUrl: './create-question.scss',
})
export class CreateQuestion {
  csService = inject(CreateSurveyService);

  @Input() questionId:number = NaN;
  @Input() questionNumber:number = NaN;

  outputQuestionId = output<number>();

  answerId:number = 0;
  answersList:WritableSignal<{'id':number}[]> = signal([]);

  isErrorOutput = output<boolean>();

  fromInputFieldsToCreateSurvey(value:boolean){
    this.isErrorOutput.emit(value);
  }

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
    this.createAnswer();

    this.answersList.update(current => [...current, { 'id': this.answerId }]);
  }

  createAnswer(){
    const questions = this.csService.questionform.get('questions') as FormArray;
    const question = questions.at(this.csService.findOutIndex('questions', this.questionId)) as FormGroup;
    const answers = question.get('answers') as FormArray;

    answers.push(
      new FormGroup({
        'id': new FormControl(this.answerId),
        'answer': new FormControl('', [Validators.required, noWhitespaceValidator]),
        'counter': new FormControl(0),
        'percentValue': new FormControl(0)
      })
    );
  }

  removeAnswear(id:number){
    const questionArray = this.csService.getFromArray('questions', this.questionId, 'answers');
    const answersArray = this.csService.getFromNestedArray('questions', this.questionId, 'answers', id) as FormArray;
    const index = this.csService.findOutIndexFromNestedArray('questions', this.questionId, 'answers', id)

    if(answersArray.get('answer')?.value) this.removeContentAnswear(answersArray);
    else if(this.answersList().length >2) this.removeInputAnswear(questionArray, index, id);
  }

  removeContentAnswear(answersArray: FormArray){
    answersArray.get('answer')?.setValue('');
    answersArray.get('answer')?.markAsUntouched();
  }

  removeInputAnswear(questionArray:FormArray, index: number, id: number){
    questionArray.removeAt(index)
    this.answersList.update(current => current.filter(item => item.id != id));
  }

  removeQuestion(){
    this.outputQuestionId.emit(this.questionId);
  }
}