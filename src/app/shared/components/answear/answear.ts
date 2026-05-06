import { Component, Input, signal, WritableSignal } from '@angular/core';
import { CheckBox } from "../check-box/check-box";

@Component({
  selector: 'app-answear',
  imports: [CheckBox],
  templateUrl: './answear.html',
  styleUrl: './answear.scss',
})
export class Answear {
  @Input() spanEnumeration:string ="";
  @Input() spanText:string =""
  @Input() multipleAnswers: true | {'boolen': false, 'name':string} = true;

  isChecked: WritableSignal<boolean> = signal(false);

  onToggle() {
    if(this.isChecked()) this.isChecked.set(false);
    else this.isChecked.set((true));
  }
}


//html template: <app-answear [spanEnumeration]="'A.'" [spanText]="'27.08.2025'"></app-answear>