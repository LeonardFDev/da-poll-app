import { Component, Input, signal } from '@angular/core';
import { SurveyStatus } from "../survey-status/survey-status";

@Component({
  selector: 'app-highlights-card',
  imports: [SurveyStatus],
  templateUrl: './highlights-card.html',
  styleUrl: './highlights-card.scss',
})
export class HighlightsCard {
  @Input() highlightsCardText:string ="";
  @Input() highlightsCardH1:string = "";
  hover = signal(false);
}


//html template: <app-highlights-card [highlightsCardText]="'Team activities'" [highlightsCardH1]="'Let’s Plan the Next Team Event Together'"></app-highlights-card>