import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class QuestionValuesServices {
  questionform:FormGroup = new FormGroup({
    name: new FormControl('name'),
    endDate: new FormControl('2000-02-02'),
    describing: new FormControl('describing'),
    // question1: new FormControl('question1'),
    // question2: new FormControl('question2'),
    // multipleAnswers1: new FormControl(true),
    // answear1A: new FormControl('answear1A'),
    // answear1B: new FormControl('answear1B'),
    // answear2A: new FormControl('answear2A'),
    // answear2B: new FormControl('answear2B'),
  });

  nameControl(value:string): FormControl {
    return this.questionform.get(value) as FormControl;
  }
}
