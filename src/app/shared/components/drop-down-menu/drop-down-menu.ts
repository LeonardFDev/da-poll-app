import { Component, computed, Input, signal } from '@angular/core';

@Component({
  selector: 'app-drop-down-menu',
  imports: [],
  templateUrl: './drop-down-menu.html',
  styleUrl: './drop-down-menu.scss',
})
export class DropDownMenu {
  @Input() dropDownText='';

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
      this.isSelected.set(false);;
    }

    else{
      this.sinlgeMenuList.forEach(menu => {
        menu.isSelected = false;
      });

      this.sinlgeMenuList[index].isSelected = true;
      this.selectedMenu = this.sinlgeMenuList[index].title;
      this.isSelected.set(true);
    }
  }
}