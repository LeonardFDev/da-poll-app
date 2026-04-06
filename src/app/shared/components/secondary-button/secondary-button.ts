import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  imports: [],
  templateUrl: './secondary-button.html',
  styleUrl: './secondary-button.scss',
})
export class SecondaryButton {
  @Input() btnText: string = '';
  @Input() imgUrl: string = '';
  @Input() withImg: boolean = false;
  @Input() secondColor:boolean = false;
}

//html template (with img): <app-secondary-button [btnText]="'Add next question'" [withImg]="true" [imgUrl]="'/assets/img/add_circle_secondary_button.png'"></app-secondary-button>
//html template (without img): <app-secondary-button [btnText]="'Add next question'" [withImg]="false"></app-secondary-button>