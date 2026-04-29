import { Component, computed, ElementRef, Input, ViewChild, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-box',
  imports: [ReactiveFormsModule],
  templateUrl: './check-box.html',
  styleUrl: './check-box.scss',
})
export class CheckBox {
  isChecked = new FormControl(false);
  @Input() nameControl!:FormControl;
  @Input() changeType: 'checkbox' | {'type': 'radio', 'name':string} = 'checkbox';
  @Input() isPartOfAnswear:boolean = false;
  @Input() isPartOfCreateSurvey:boolean = false;
  @Input() checkedSignal!: WritableSignal<boolean>;
  @Input() whiteBorder:boolean = false;

  @ViewChild('customCheckboxInput') inputRef!:ElementRef<HTMLInputElement>;

  ngAfterViewInit(){
    if(typeof this.changeType == "object"){
      this.inputRef.nativeElement.type = this.changeType.type;
      this.inputRef.nativeElement.name = this.changeType.name;
    }
    
    else this.inputRef.nativeElement.type = this.changeType;

    if(this.nameControl) this.nameControl.valueChanges.subscribe(() => this.setValueNameControl());
  }

  setValueNameControl(){
    if(this.nameControl.value == false) this.inputRef.nativeElement.checked = false;
    else this.nameControl.setValue(this.inputRef.nativeElement.checked, {emitEvent: false});
  }

  checkedComputed = computed(() =>{
    if(this.isPartOfAnswear) return this.checkedSignal();
    else return this.checkedSignal;
  });
}

//html template: <app-check-box [changeType]="{'type':'radio', 'name':'Test'}"></app-check-box>