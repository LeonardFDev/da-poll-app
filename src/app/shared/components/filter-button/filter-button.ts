import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-button',
  imports: [],
  templateUrl: './filter-button.html',
  styleUrl: './filter-button.scss',
})
export class FilterButton {
  @Input() btnText:string = "";
  @Input() active = false;
}

// html template: <app-filter-button [active]="activeIndex == 1" (click)="onClick(1)" [btnText]="'Active survey'"></app-filter-button>
