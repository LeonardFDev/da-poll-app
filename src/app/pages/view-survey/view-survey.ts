import { Component, inject, signal } from '@angular/core';
import { PrimaryButton } from "../../shared/components/primary-button/primary-button";
import { SurveyStatus } from "../../shared/components/survey-status/survey-status";
import { Question } from "../../shared/components/question/question";
import { SetQuestionsServices } from '../../shared/services/set-questions/set-questions';
import { SecondaryButton } from "../../shared/components/secondary-button/secondary-button";
import { Results } from "../../shared/components/results/results";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-survey',
  imports: [PrimaryButton, SurveyStatus, Question, SecondaryButton, Results],
  templateUrl: './view-survey.html',
  styleUrl: './view-survey.scss',
})
export class ViewSurvey {
  private route = inject(ActivatedRoute);
  currentId:number | null = 0;
  isPlaceholder = signal(false);

  setQuestion = inject(SetQuestionsServices);
  questionslist = this.setQuestion.questionsList;

  currentQuesten = this.setQuestion.placeholder;

  ngOnInit(){
    this.currentId = Number(this.route.snapshot.paramMap.get('id'));

    this.isPlaceholder.set(!this.questionslist().some(item => item.id === this.currentId));
    
    this.questionslist().find(item => {
      if(item.id == this.currentId) this.currentQuesten.set(item);
    })
  }
}
