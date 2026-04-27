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
    questionsAndAnswers: new FormGroup({
      // answers: new FormGroup({})
    })
  });

  nameControl(value:string): FormControl {
    return this.questionform.get(value) as FormControl;
  }

  // this.form.get('settings.myCheckbox') as FormControl
}
