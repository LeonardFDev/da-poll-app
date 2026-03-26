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
  @Input() changeType:{'type': 'checkbox' |'radio', 'name':string} = {'type':'checkbox', 'name':''};
  @Input() isPartOfAnswear:boolean = false;
  @Input() checkedSignal!: WritableSignal<boolean>;

  @ViewChild('customCheckboxInput') inputRef!:ElementRef<HTMLInputElement>;

  ngAfterViewInit(){
    this.inputRef.nativeElement.type = this.changeType.type;
    this.inputRef.nativeElement.name = this.changeType.name;
  }

  checkedComputed = computed(() =>{
    if(this.isPartOfAnswear) return this.checkedSignal();
    else return this.checkedSignal;
  });
}

//html template: <app-check-box [changeType]="{'type':'radio', 'name':'Test'}"></app-check-box>