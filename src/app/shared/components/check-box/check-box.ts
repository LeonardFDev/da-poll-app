import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-box',
  imports: [ReactiveFormsModule],
  templateUrl: './check-box.html',
  styleUrl: './check-box.scss',
})
export class CheckBox {
  isChecked = new FormControl(false);
  @Input() changeType:{'type': 'checkbox' |'radio', 'name':string} = {'type':'checkbox', 'name':''};
}
