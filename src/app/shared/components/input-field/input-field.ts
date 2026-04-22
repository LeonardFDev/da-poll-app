import { Component, inject, Input } from '@angular/core';
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
}