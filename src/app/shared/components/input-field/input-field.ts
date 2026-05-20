import { Component, inject, Input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreateSurveyService } from '../../services/create-survey/create-survey';

@Component({
  selector: 'app-input-field',
  imports: [ReactiveFormsModule],
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss',
})
export class InputField {
  csService = inject(CreateSurveyService);

  @Input() type:'inputText' | 'textarea' | 'inputDate'= 'inputText';
  @Input() nameControl!:FormControl;

  isErrorOutput = output<boolean>();

  get dateInvalid(): boolean {
    const isError = this.nameControl.invalid && this.nameControl.touched;
    
    this.isErrorOutput.emit(isError);
    return isError;
  }
  
  calendarValueChange(){
    const FormControlEndDate = this.csService.nameControl('endDate');
    if(!FormControlEndDate.value) FormControlEndDate.setValue('No end date');
  }
}