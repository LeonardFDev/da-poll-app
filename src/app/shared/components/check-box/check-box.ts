import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
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
  
  @Input() whiteBorder:boolean = false;
  @Input() withInputHover:boolean = false

  @Input() isWithText:boolean = false;
  @Input() spanEnumeration:string ="";
  @Input() spanText:string =""

  @ViewChild('customCheckboxInput') inputRef!:ElementRef<HTMLInputElement>;

  isChecked = signal(false);

  ngAfterViewInit(){
    if(typeof this.multipleAnswers == "object"){
      this.inputRef.nativeElement.type = 'radio';
      this.inputRef.nativeElement.name = this.multipleAnswers.name;
    }
    else this.inputRef.nativeElement.type = 'checkbox';
  }

  onToggle() {
    this.isChecked.set(!this.isChecked());
    if(this.answerView){
      if(typeof this.multipleAnswers == "object") this.answersFormArray.controls.find(answer => answer?.get('checked')?.setValue(false))
      this.answerView.setValue(this.inputRef.nativeElement.checked);
    }

    if(this.nameControl){
      this.nameControl.setValue(this.isChecked());
    }
  }
}

//html template: <app-check-box [changeType]="{'type':'radio', 'name':'Test'}"></app-check-box>