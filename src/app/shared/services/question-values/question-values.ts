import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class QuestionValuesServices {
  questionform:FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    endDate: new FormControl('No end date'),
    description: new FormControl(''),
    category: new FormControl('No category'),
    questions: new FormArray([])
  });

  nameControl(value:string): FormControl {
    return this.questionform.get(value) as FormControl;
  }

  getNameControlFromArray(questionsArray:string, questionId: number, fomrControl:string) {
  return (this.questionform.get(questionsArray) as FormArray)
  .at(this.findOutIndex(questionsArray, questionId))
  .get(fomrControl) as FormControl;
  }

  getFromArray(questionsArray:string, questionId: number, fomrControl:string) {
  return (this.questionform.get(questionsArray) as FormArray)
  .at(this.findOutIndex(questionsArray, questionId))
  .get(fomrControl) as FormArray;
  }

  getNameControlFromNestedArray(questionsArray:string, questionId: number, answearsArray:string, answerId: number, fomrControl:string) {
  return (
    (this.questionform.get(questionsArray) as FormArray)
    .at(this.findOutIndex(questionsArray, questionId))
    .get(answearsArray) as FormArray)
    .at(this.findOutIndexFromNestedArray(questionsArray, questionId, answearsArray, answerId))
    .get(fomrControl) as FormControl;
  }

  getFromNestedArray(questionsArray:string, questionId: number, answearsArray:string, answerId: number) {
  return (
    (this.questionform.get(questionsArray) as FormArray)
    .at(this.findOutIndex(questionsArray, questionId))
    .get(answearsArray) as FormArray)
    .at(this.findOutIndexFromNestedArray(questionsArray, questionId, answearsArray, answerId))
  }

  findOutIndex(arrayValue:string, id:number):number{
    return (this.questionform.get(arrayValue) as FormArray).controls.findIndex(element => 
      element.get('id')?.value == id
    );
  }

  findOutIndexFromNestedArray(questionsArray:string, questionId:number, answearsArray:string, answearId:number){
    const questionIndex = this.findOutIndex(questionsArray, questionId);

    const answearsFormArray = (this.questionform.get(questionsArray) as FormArray)
    .at(questionIndex)
    .get(answearsArray) as FormArray;

    return answearsFormArray.controls.findIndex(element => 
      element.get('id')?.value == answearId
    );
  }

  convertToChar(number:number){
    return String.fromCharCode(65+number);
  }
}
