import { Component, computed, ElementRef, Input, ViewChild, WritableSignal } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-box',
  imports: [ReactiveFormsModule],
  templateUrl: './check-box.html',
  styleUrl: './check-box.scss',
})
export class CheckBox {
  @Input() nameControl!:FormControl;
  @Input() answerView!:FormControl

  @Input() answersFormArray!:FormArray;

  @Input() multipleAnswers: true | {'boolen': false, 'name':string} = true;
  @Input() checkedSignal!: WritableSignal<boolean>;

  @Input() isPartOfAnswear:boolean = false;
  @Input() isPartOfCreateSurvey:boolean = false;
  @Input() isPartOfViewSurvey:boolean = false;
  
  @Input() whiteBorder:boolean = false;

  @ViewChild('customCheckboxInput') inputRef!:ElementRef<HTMLInputElement>;

  ngAfterViewInit(){
    if(typeof this.multipleAnswers == "object"){
      this.inputRef.nativeElement.type = 'radio';
      this.inputRef.nativeElement.name = this.multipleAnswers.name;
    }
    else this.inputRef.nativeElement.type = 'checkbox';

    if(this.nameControl) this.nameControl.valueChanges.subscribe(() => this.setValueNameControl());
    
    if(this.isPartOfViewSurvey && this.answerView){
      this.answerView.valueChanges.subscribe(() => this.setValueAnswersView());
    }
    if(this.isPartOfViewSurvey && this.answerView) this.answerView.valueChanges.subscribe(() =>this.setValueAnswersView());
  }

  setValueNameControl(){
    if(this.nameControl.value == false) this.inputRef.nativeElement.checked = false;
    else this.nameControl.setValue(this.inputRef.nativeElement.checked, {emitEvent: false});
  }

  setValueAnswersView(){
    if(typeof this.multipleAnswers == "object") this.answersFormArray.controls.find(answer => answer.get('checked')?.setValue(false, {emitEvent: false}));
    this.answerView.setValue(!this.inputRef.nativeElement.checked, {emitEvent: false});
  }

  checkedComputed = computed(() =>{
    if(this.isPartOfViewSurvey && this.answerView){
      this.answerView.setValue(this.checkedSignal());
    }

    return this.checkedSignal();
  });
}

//html template: <app-check-box [changeType]="{'type':'radio', 'name':'Test'}"></app-check-box>