import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { CreateSurveyService } from '../../services/create-survey/create-survey';

@Component({
  selector: 'app-drop-down-menu',
  imports: [],
  templateUrl: './drop-down-menu.html',
  styleUrl: './drop-down-menu.scss',
})
export class DropDownMenu {
  csService = inject(CreateSurveyService);

  @Input() dropDownText='';
  @Input() isPartOfCreateSurvey:boolean = false;
  @Input() isPartOfMainPage:boolean = false;
  
  @Output() getSelectedMenu = new EventEmitter<string>();

  isOpen = signal(false);
  isSelected = signal(false);
  isOpenOrSelected = computed(() => this.isOpen() || this.isSelected());

  selectedMenu:string = '';

  sinlgeMenuList:{'title':string, 'isSelected': boolean}[] = [
    {'title':"Team Activities", 'isSelected': false}, 
    {'title':"Health & Wellness", 'isSelected': false}, 
    {'title':"Gaming & Entertainment", 'isSelected': false}, 
    {'title':"Education & Learning", 'isSelected': false}, 
    {'title':"Lifestyle & Preferences", 'isSelected': false}, 
    {'title':"Technology & Innovation", 'isSelected': false}
  ];

  ngAfterViewInit(){
    if(this.isPartOfMainPage)this.sinlgeMenuList.unshift({'title':"Sort all", 'isSelected': false});
    if(this.isPartOfCreateSurvey)this.sinlgeMenuList.unshift({'title':"No category", 'isSelected': false})
    window.addEventListener('click', () => this.closeMenu());
  }

  closeMenu(){
    if(this.isOpen()) this.isOpen.set(false);
  }

  ngOnDestroy() {
    window.removeEventListener('click', this.closeMenu);
  }

  open(event:PointerEvent){
    event.stopPropagation();
    if(this.isOpen()) this.isOpen.set(false);
    else this.isOpen.set(true);
  }
  
  selected(index:number){
    if(this.sinlgeMenuList[index].isSelected == true){
      this.sinlgeMenuList[index].isSelected = false;
      this.selectedMenu = ''
      this.isSelected.set(false);
    }

    else this.newSelected(index); 

    this.getCategory();
    this.passOnSelectedMenu();
  }

  newSelected(index:number){
    this.sinlgeMenuList.forEach(menu => {
      menu.isSelected = false;
    });
  
    this.sinlgeMenuList[index].isSelected = true;
    this.selectedMenu = this.sinlgeMenuList[index].title;
    this.isSelected.set(true);
  
    this.ifSpecialSelected(index, "Sort all");
    this.ifSpecialSelected(index, "No category");
  }

  ifSpecialSelected(index:number, special:string){
    if(this.sinlgeMenuList[index].title == special){
      this.selectedMenu = '';
      this.sinlgeMenuList[index].isSelected = false;
      this.isSelected.set(false);
    }
  }

  getCategory(){
    if(this.isPartOfCreateSurvey){
      if(!this.selectedMenu) this.csService.questionform.value.category = this.csService.questionform.get('category')?.setValue('No category');
      else this.csService.questionform.get('category')?.setValue(this.selectedMenu);
    }
  }

  passOnSelectedMenu(){
    if(this.isPartOfMainPage) this.getSelectedMenu.emit(this.selectedMenu);
  }
}