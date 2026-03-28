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
  @Input() changeType: 'checkbox' | {'type': 'radio', 'name':string} = 'checkbox';
  @Input() isPartOfAnswear:boolean = false;
  @Input() checkedSignal!: WritableSignal<boolean>;

  @ViewChild('customCheckboxInput') inputRef!:ElementRef<HTMLInputElement>;

  ngAfterViewInit(){
    if(typeof this.changeType == "object"){
      this.inputRef.nativeElement.type = this.changeType.type;
      this.inputRef.nativeElement.name = this.changeType.name;
    }
    
    else this.inputRef.nativeElement.type = this.changeType;
  }

  checkedComputed = computed(() =>{
    if(this.isPartOfAnswear) return this.checkedSignal();
    else return this.checkedSignal;
  });
}

//html template: <app-check-box [changeType]="{'type':'radio', 'name':'Test'}"></app-check-box>