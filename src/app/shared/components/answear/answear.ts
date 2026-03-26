import { Component, signal, WritableSignal } from '@angular/core';
import { CheckBox } from "../check-box/check-box";

@Component({
  selector: 'app-answear',
  imports: [CheckBox],
  templateUrl: './answear.html',
  styleUrl: './answear.scss',
})
export class Answear {
  isChecked: WritableSignal<boolean> = signal(false);

  onToggle() {
    if(this.isChecked()) this.isChecked.set(false);
    else this.isChecked.set((true));
  }
}
