import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-survey-status',
  imports: [],
  templateUrl: './survey-status.html',
  styleUrl: './survey-status.scss',
})
export class SurveyStatus {
  @Input() statusText:string = "";
  @Input() colorType: 'primary' | 'secondary' | '' = '';
}


//html template: <app-survey-status [colorType]="'primary'" [statusText]="'Published'"></app-survey-status>