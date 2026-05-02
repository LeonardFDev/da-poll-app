import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { QuestionValuesServices } from '../../services/question-values/question-values';

@Component({
  selector: 'app-drop-down-menu',
  imports: [],
  templateUrl: './drop-down-menu.html',
  styleUrl: './drop-down-menu.scss',
})
export class DropDownMenu {
  qvService = inject(QuestionValuesServices);

  @Input() dropDownText='';
  @Input() isPartOfCreateSurvey:boolean = false;
  @Input() isPartOfMainPage:boolean = false;
  
  @Output() getSelectedMenu = new EventEmitter<string>();
  
  isOpen = signal(false);
  isSelected = signal(false);
  isOpenOrSelected = computed(() => this.isOpen() || this.isSelected());

  selectedMenu:string = '';

  open(){
    if(this.isOpen()) this.isOpen.set(false);
    else this.isOpen.set(true);
  }

  sinlgeMenuList:{'title':string, 'isSelected': boolean}[] = [
    {'title':"Team Activities", 'isSelected': false}, 
    {'title':"Health & Wellness", 'isSelected': false}, 
    {'title':"Gaming & Entertainment", 'isSelected': false}, 
    {'title':"Education & Learning", 'isSelected': false}, 
    {'title':"Lifestyle & Preferences", 'isSelected': false}, 
    {'title':"Technology & Innovation", 'isSelected': false}
  ];
  
  selected(index:number){
    if(this.sinlgeMenuList[index].isSelected == true){
      this.sinlgeMenuList[index].isSelected = false;
      this.selectedMenu = ''
      this.isSelected.set(false);
    }

    else{
      this.sinlgeMenuList.forEach(menu => {
        menu.isSelected = false;
      });

      this.sinlgeMenuList[index].isSelected = true;
      this.selectedMenu = this.sinlgeMenuList[index].title;
      this.isSelected.set(true);
    }

    this.getCategory();
    this.passOnSelectedMenu();
  }

  getCategory(){
    if(this.isPartOfCreateSurvey){
      if(!this.selectedMenu) this.qvService.questionform.value.category = this.qvService.questionform.get('category')?.setValue('No category');
      else this.qvService.questionform.get('category')?.setValue(this.selectedMenu);
    }
  }

  passOnSelectedMenu(){
    if(this.isPartOfMainPage) this.getSelectedMenu.emit(this.selectedMenu);
  }
}