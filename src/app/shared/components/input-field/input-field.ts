import { Component, computed, inject, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { QuestionValuesServices } from '../../services/question-values/question-values';

@Component({
  selector: 'app-input-field',
  imports: [ReactiveFormsModule],
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss',
})
export class InputField {
  qvService = inject(QuestionValuesServices);

  @Input() type:'inputText' | 'textarea' | 'inputDate'= 'inputText';
  @Input() nameControl!:FormControl;

  get dateInvalid(): boolean {
    return this.nameControl.invalid && this.nameControl.touched;
  }
  
  calendarValueChange(){
    const FormControlEndDate = this.qvService.nameControl('endDate');
    if(!FormControlEndDate.value) FormControlEndDate.setValue('No end date');
  }

}