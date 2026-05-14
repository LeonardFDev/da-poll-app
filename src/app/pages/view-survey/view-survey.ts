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
  gsdService = inject(GetSurveyDatabaseService);

  currentId:number | null = 0;
  isPlaceholder = signal(false);

  questionslist = this.gsdService.questionsList;
  currentQuesten = this.gsdService.placeholder;

  isCloseResultsBox = false;
  isSurveySubmitted = false;

  answersCheckList = signal(new FormArray<FormGroup>([]));

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 1412 && this.isCloseResultsBox) this.isCloseResultsBox = false;
  }

  constructor(){
    this.currentId = Number(this.route.snapshot.paramMap.get('id'));
    this.isPlaceholder.set(!this.questionslist().some(item => item.id == this.currentId));

    this.questionslist().find(item => {
      if(item.id == this.currentId) this.currentQuesten.set(item);
    });

    this.createAnswersCheckList();
  }

  questionAnswersView(index:number){
    return this.answersCheckList().controls[index];
  }

  openClose(){
    if(this.isCloseResultsBox) this.isCloseResultsBox = false;
    else this.isCloseResultsBox = true;
  }

  surveySubmitted(){
    this.checkHasQuestionAnyAnswered();

    if(!this.isSurveySubmitted && this.answersCheckList().controls.some(item => item.get('hasQuestionAnyAnswered')?.value == false)){
      console.log('no');
      // console.log(this.answersCheckList().value);
    }
    else if(!this.isSurveySubmitted){
      this.isSurveySubmitted = true;
      console.log('yes');

      // console.log(this.currentQuesten().questions);
        this.currentQuesten.update(updateCounter => {
          const questions = [...updateCounter.questions];

          for (let qIndex = 0; qIndex < questions.length; qIndex++) {
            const answersFormArray = this.answersCheckList().controls[qIndex].get('answers') as FormArray;
            const question = questions[qIndex];
            const answers = [...question.answers];

            for (let aIndex = 0; aIndex < answers.length; aIndex++) {
              const isChecked = answersFormArray.controls[aIndex].get('checked')?.value;

              if(isChecked){
                answers[aIndex] = {
                  ...answers[aIndex],
                  'counter': answers[aIndex].counter +1
                };
              }
            }

            questions[qIndex]= {
              ...question,
              'answers': answers
            };
          }
          
          return {
            ...updateCounter,
            'questions': questions
          };
        });

      this.gsdService.calculatePercent();
    }
  }

  createAnswersCheckList(){
    this.answersCheckList.set(new FormArray<FormGroup>([]));
    
    this.currentQuesten().questions.find(question => {
      this.answersCheckList().push(
        new FormGroup({
          'questionId': new FormControl(question.id),
          'answers': new FormArray<FormGroup>([]),
          'hasQuestionAnyAnswered': new FormControl(null),
        })
      );

      question.answers.find(answer => {
        this.answersCheckList().controls.filter(item => item.get('questionId')?.value == question.id).find(item =>{
          const answearsFormArray = item.get('answers') as FormArray
          answearsFormArray.push(
            new FormGroup({
              'answerId': new FormControl(answer.id),
              'checked': new FormControl(null)
            })
          );
        });
      });
    });

    // console.log(this.answersCheckList().value);
  }

  checkHasQuestionAnyAnswered(){
    this.answersCheckList().controls.filter(item => item.get('hasQuestionAnyAnswered')?.setValue((item.get('answers') as FormArray).controls.some(item => item.get('checked')?.value == true)));
  }
}