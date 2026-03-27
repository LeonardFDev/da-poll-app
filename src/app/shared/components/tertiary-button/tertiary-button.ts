import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tertiary-button',
  imports: [],
  templateUrl: './tertiary-button.html',
  styleUrl: './tertiary-button.scss',
})
export class TertiaryButton {
  @Input() buttonText:string = "";
}
