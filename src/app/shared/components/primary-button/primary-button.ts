import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [CommonModule],
  templateUrl: './primary-button.html',
  styleUrl: './primary-button.scss',
})
export class PrimaryButton {
  @Input() btnText:string = "";
  @Input() withIcon:{'isWithIcon':true, 'icon': '✓' | '⊕', iconWidth: 18 | 24} | {'isWithIcon':false, 'icon': '', iconWidth: 0} = {'isWithIcon':false, 'icon': '', iconWidth: 0};
  @ViewChild('img') imgRef!:ElementRef<HTMLImageElement>;

  ngAfterViewInit() {
    if(this.withIcon.icon == '⊕'){
      this.withIcon.iconWidth = 24;
      this.imgRef.nativeElement.src ='assets/img/add_circle_primary-button.svg';
    } 
    else if(this.withIcon.icon == '✓'){
      this.withIcon.iconWidth = 18;
      this.imgRef.nativeElement.src ='assets/img/check.svg';
    }
  }
}


// html template: <app-primary-button [btnText]="'New survey'" [withIcon]="{'isWithIcon': true, 'icon': '⊕', 'iconWidth':24}"></app-primary-button>