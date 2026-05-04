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
  @Input() surveyStatus:string ='';

  endingInOutput:string =''

  ngOnInit(){
    if(this.surveyStatus.toLocaleLowerCase() == 'no end date') this.endingInOutput = '∞';

    else{
      const date = new Date(this.surveyStatus)
      date.setHours(0, 0, 0, 0);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let endingIn = Math.round((new Date(date).getTime() - new Date(today).getTime()) / (1000 * 60 * 60 * 24) + 1);

      if(Number(endingIn) <= 0) endingIn = 0;
      this.endingInOutput = String(endingIn);
    }
  }
}
