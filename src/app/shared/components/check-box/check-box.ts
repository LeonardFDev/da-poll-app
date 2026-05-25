import { Component, DestroyRef, ElementRef, inject, Input, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-box',
  imports: [ReactiveFormsModule],
  templateUrl: './check-box.html',
  styleUrl: './check-box.scss',
})
export class CheckBox {
  destroyRef = inject(DestroyRef);

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

    this.changesNameControl();
  }

  changesNameControl(){
    if(this.nameControl){
      let inputRefNav = this.inputRef.nativeElement;
      this.nameControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => { 
        if(inputRefNav.checked != value){
          inputRefNav.checked = value;
          this.isChecked.set(value);
        }
      });
    }
  }

  onToggle() {
    this.isChecked.set(!this.isChecked());
    this.inputRef.nativeElement.checked = this.isChecked();

    if(this.answerView){
      if(typeof this.multipleAnswers == "object") this.answersFormArray.controls.find(answer => answer?.get('checked')?.setValue(false));
      this.answerView.setValue(this.inputRef.nativeElement.checked);
    }

    if(this.nameControl)this.nameControl.setValue(this.isChecked());
  }
}

//html template: <app-check-box [changeType]="{'type':'radio', 'name':'Test'}"></app-check-box>