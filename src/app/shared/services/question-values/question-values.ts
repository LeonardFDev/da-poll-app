import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class QuestionValuesServices {
  questionform = new FormGroup({
    name: new FormControl('name'),
    endDate: new FormControl('2000-02-02'),
    describing: new FormControl('describing'),
    question1: new FormControl('question1'),
    multipleAnswers: new FormControl(true),
    answear1A: new FormControl('answear1A'),
    answear1B: new FormControl('answear1B')
  });

  nameControl(value:string): FormControl {
    return this.questionform.get(value) as FormControl;
  }
}
