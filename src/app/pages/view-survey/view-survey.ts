import { Component, HostListener, inject, signal} from '@angular/core';
import { PrimaryButton } from "../../shared/components/primary-button/primary-button";
import { SurveyStatus } from "../../shared/components/survey-status/survey-status";
import { Question } from "../../shared/components/question/question";
import { SetQuestionsServices } from '../../shared/services/set-questions/set-questions';
import { SecondaryButton } from "../../shared/components/secondary-button/secondary-button";
import { Results } from "../../shared/components/results/results";
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-view-survey',
  imports: [PrimaryButton, SurveyStatus, Question, SecondaryButton, Results, RouterLink],
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
  isSurveySubmitted = false;
  isCloseResultsBox = false;

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 1412 && this.isCloseResultsBox) this.isCloseResultsBox = false;
  }

  ngOnInit(){
    this.currentId = Number(this.route.snapshot.paramMap.get('id'));
    this.isPlaceholder.set(!this.questionslist().some(item => item.id == this.currentId));

    this.questionslist().find(item => {
      if(item.id == this.currentId) this.currentQuesten.set(item);
    })
  }

  openClose(){
    if(this.isCloseResultsBox) this.isCloseResultsBox = false;
    else this.isCloseResultsBox = true;
  }

  surveySubmitted(){
    // if(this.isSurveySubmitted) this.isSurveySubmitted = false;
    // else this.isSurveySubmitted = true;
    this.isSurveySubmitted = true;
  }
}
