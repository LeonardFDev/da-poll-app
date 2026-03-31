import { Component, signal, WritableSignal } from '@angular/core';
import { DeleteButton } from "../delete-button/delete-button";
import { InputField } from "../input-field/input-field";
import { CheckBox } from "../check-box/check-box";
import { TertiaryButton } from "../tertiary-button/tertiary-button";


@Component({
  selector: 'app-create-question',
  imports: [DeleteButton, InputField, CheckBox, TertiaryButton],
  templateUrl: './create-question.html',
  styleUrl: './create-question.scss',
})
export class CreateQuestion {
  answearsList:WritableSignal<number[]> = signal([]);

  constructor(){
    this.answearsList.set([1,2])
  }

  fromNumberToChar(i:number){
    return String.fromCharCode(i+65);
  }
}
