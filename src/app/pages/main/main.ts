import { Component } from '@angular/core';
import { PrimaryButton } from "../../shared/components/primary-button/primary-button";
import { HeroImage } from "../../shared/components/hero-image/hero-image";
import { HighlightsCard } from "../../shared/components/highlights-card/highlights-card";
import { DropDownMenu } from "../../shared/components/drop-down-menu/drop-down-menu";
import { FilterButton } from "../../shared/components/filter-button/filter-button";
import { SurveyView } from "../../shared/components/survey-view/survey-view";

@Component({
  selector: 'app-main',
  imports: [PrimaryButton, HeroImage, HighlightsCard, DropDownMenu, FilterButton, SurveyView],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
