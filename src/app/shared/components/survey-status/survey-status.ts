import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-survey-status',
  imports: [CommonModule],
  templateUrl: './survey-status.html',
  styleUrl: './survey-status.scss',
})
export class SurveyStatus {
  @Input() statusText:string = "";
  @Input() colorType: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() colorHoverType: 'primary' = 'primary';

  @Input() withHover: boolean = false;
  @Input() withpaddingTB3LR6: boolean = false;
  @Input() withFontSize12: boolean = false;
}


//html template: <app-survey-status [colorType]="'primary'" [statusText]="'Published'"></app-survey-status>

// <app-survey-status [statusText]="'Ends in 1 Day'"></app-survey-status>
// <app-survey-status class="view__status" [colorType]="'tertiary'" [statusText]="'Ends in 1 Day'" [withpaddingTB3LR6]="true"></app-survey-status>
// <app-survey-status class="highlights-card__status" [colorType]="'tertiary'" [colorHoverType]="'primary'" [statusText]="'Ends in 1 Day'" [withpaddingTB3LR6]="true" [withHover]="hover()"></app-survey-status>