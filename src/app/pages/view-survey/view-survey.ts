import { Component, HostListener, inject, signal} from '@angular/core';
import { PrimaryButton } from "../../shared/components/primary-button/primary-button";
import { SurveyStatus } from "../../shared/components/survey-status/survey-status";
import { Question } from "../../shared/components/question/question";
import { GetSurveyDatabaseService } from '../../shared/services/get-survey-database/get-survey-database';
import { SecondaryButton } from "../../shared/components/secondary-button/secondary-button";
import { Results } from "../../shared/components/results/results";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-view-survey',
  imports: [PrimaryButton, SurveyStatus, Question, SecondaryButton, Results, RouterLink],
  templateUrl: './view-survey.html',
  styleUrl: './view-survey.scss',
})
export class ViewSurvey {
  private route = inject(ActivatedRoute);
  setQuestion = inject(GetSurveyDatabaseService);

  currentId:number | null = 0;
  isPlaceholder = signal(false);

  questionslist = this.setQuestion.questionsList;
  currentQuesten = this.setQuestion.placeholder;

  isCloseResultsBox = false;
  isSurveySubmitted = false;

  answersCheckList = new FormArray<FormGroup>([]);

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 1412 && this.isCloseResultsBox) this.isCloseResultsBox = false;
  }

  ngOnInit(){
    this.currentId = Number(this.route.snapshot.paramMap.get('id'));
    this.isPlaceholder.set(!this.questionslist().some(item => item.id == this.currentId));

    this.questionslist().find(item => {
      if(item.id == this.currentId) this.currentQuesten.set(item);
    });
  }

  openClose(){
    if(this.isCloseResultsBox) this.isCloseResultsBox = false;
    else this.isCloseResultsBox = true;
  }

  surveySubmitted(){
    if(!this.isSurveySubmitted) this.test();
    if(!this.isSurveySubmitted && this.answersCheckList.controls.some(item => item.get('hasQuestionAnyAnswered')?.value == false)){
      console.log('no');
    }
    else if(!this.isSurveySubmitted){
      this.isSurveySubmitted = true;
      console.log('yes');
    }
  }

  test(){
    this.answersCheckList = new FormArray<FormGroup>([])
    
    this.currentQuesten().questions.find(question => {
      this.answersCheckList.push(
        new FormGroup({
          'questionId': new FormControl(question.id),
          'answears': new FormArray<FormGroup>([]),
          'hasQuestionAnyAnswered': new FormControl(false),
        })
      );

      question.answers.find(answer => {
        this.answersCheckList.controls.filter(item => item.get('questionId')?.value == question.id).find(item =>{
          const answearsFormArray = item.get('answears') as FormArray
          answearsFormArray.push(
            new FormGroup({
              'answearId': new FormControl(answer.id),
              'checked': new FormControl(false)
            })
          );
        });
      });
    });

    (this.answersCheckList.controls[0].get('answears') as FormArray).controls[1].get('checked')?.setValue(true);
    (this.answersCheckList.controls[1].get('answears') as FormArray).controls[1].get('checked')?.setValue(true);
    (this.answersCheckList.controls[2].get('answears') as FormArray).controls[1].get('checked')?.setValue(true);
    (this.answersCheckList.controls[3].get('answears') as FormArray).controls[0].get('checked')?.setValue(true);

    this.answersCheckList.controls.filter(item => item.get('hasQuestionAnyAnswered')?.setValue((item.get('answears') as FormArray).controls.some(item => item.get('checked')?.value == true)));

    // console.log(this.answersCheckList.value);
  }
}