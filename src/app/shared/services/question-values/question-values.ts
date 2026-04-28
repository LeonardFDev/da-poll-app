import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class QuestionValuesServices {
  questionform:FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('name'),
    endDate: new FormControl('2000-02-02'),
    description: new FormControl('describing'),
    category: new FormControl('No category')
  });

  nameControl(value:string): FormControl {
    return this.questionform.get(value) as FormControl;
  }
}
