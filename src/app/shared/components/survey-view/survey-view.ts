import { Component, Input } from '@angular/core';
import { SurveyStatus } from "../survey-status/survey-status";

@Component({
  selector: 'app-survey-view',
  imports: [SurveyStatus],
  templateUrl: './survey-view.html',
  styleUrl: './survey-view.scss',
})
export class SurveyView {
  @Input() viewSpan:string = '';
  @Input() viewH1:string = '';
  @Input() viewStatusText:string = '';
}
