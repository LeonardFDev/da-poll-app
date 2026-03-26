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
  @Input() withIcon:{'isWithIcon':boolean, 'iconUrl':string} = {'isWithIcon':false, 'iconUrl':''};
  @ViewChild('btn') btnRef!:ElementRef<HTMLButtonElement>;
  

  ngAfterViewInit() {
    window.addEventListener('load', () => {if(this.withIcon.isWithIcon) this.findOutImageSize()});
  }

  findOutImageSize(){
    const img = document.createElement("img");
    if(!this.withIcon.iconUrl) return;
    img.src = this.withIcon.iconUrl;    

    img.onload = () =>{
      let btnStyle = this.btnRef.nativeElement.style
      btnStyle.setProperty('--img-width', img.width + 'px');
      btnStyle.setProperty('--img-height', img.height + 'px');
      btnStyle.setProperty('--img-url', `url('${this.withIcon.iconUrl}')`);
  
  
      const btn:HTMLButtonElement = this.btnRef.nativeElement;
      const btnWidth = btn.getBoundingClientRect().width;
      this.btnRef.nativeElement.style.setProperty('--btn-width', btnWidth  + 'px');
      this.btnRef.nativeElement.style.setProperty('--btn-width-hover', (btnWidth + img.width + 10)  + 'px');
    }
  }
}


// html template: <app-primary-button [btnText]="'New survey'" [withIcon]="{'isWithIcon':true, 'iconUrl':'/assets/img/check.png'}"></app-primary-button>
