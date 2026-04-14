import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PrimaryButton } from "../../shared/components/primary-button/primary-button";
import { HeroImage } from "../../shared/components/hero-image/hero-image";
import { HighlightsCard } from "../../shared/components/highlights-card/highlights-card";
import { DropDownMenu } from "../../shared/components/drop-down-menu/drop-down-menu";
import { FilterButton } from "../../shared/components/filter-button/filter-button";
import { SurveyView } from "../../shared/components/survey-view/survey-view";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [PrimaryButton, HeroImage, HighlightsCard, DropDownMenu, FilterButton, SurveyView, RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  router = inject(Router)

  @ViewChild('highlightsCards') highlightsCardsRef!: ElementRef<HTMLElement>;
  highlightsCards!:HTMLElement;

  startX = 0;
  currentX = 0;
  lastX = 0;
  velocity = 0;
  dragging = false;
  rafId: number | null = null;

  ngAfterViewInit(){
    this.highlightsCards = this.highlightsCardsRef.nativeElement;

    this.highlightsCards.addEventListener('pointerdown', (event) => this.onPointerDown(event));
    this.highlightsCards.addEventListener('pointermove', (event) => this.onPointerMove(event));
    this.highlightsCards.addEventListener('pointerup', (event) => this.onPointerUp(event));
    this.highlightsCards.addEventListener('pointercancel', (event) => this.onPointerUp(event));
    this.highlightsCards.addEventListener('pointerout', (event) => this.pointerout(event));
    
  }

  onPointerDown (e: PointerEvent) {
    if (e.button != 0 || !(e.target as HTMLElement).closest('.highlights-card')) return;

    this.dragging = true;
    this.startX = e.clientX - this.currentX;
    
    this.lastX = e.clientX;

    this.velocity = 0;

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  onPointerMove(e: PointerEvent) {
    if (!this.dragging) return;

    let newX = e.clientX - this.startX;
    let dx = e.clientX - this.lastX;
    this.velocity = dx / 10;
    this.lastX = e.clientX;

    const max = this.highlightsCards.offsetWidth - this.highlightsCards.children[0].clientWidth -12
    newX = Math.max(-572, Math.min(newX, max));

    this.currentX = newX;

    this.highlightsCards.style.transform = `translateX(${this.currentX}px)`;
  }

  pointerout(e: PointerEvent){
    if (!this.dragging) return;
    this.dragging = false;
    this.animate();
  }

  onPointerUp(e: PointerEvent){
    if(this.velocity == 0 && e.button == 0){
      let id = (e.target as HTMLElement).closest('.highlights-card')?.id
      if(id) this.router.navigate(['/view-survey', id]);
    }

    if (!this.dragging) return;
    this.dragging = false;
    this.animate();
  }

  animate(){
    this.velocity *= 0.85; //0.95;

    if (Math.abs(this.velocity) < 0.02) {
      this.velocity = 0;
      return;
    }

    this.currentX += this.velocity * 16;

    const max = this.highlightsCards.offsetWidth - this.highlightsCards.children[0].clientWidth -12

    this.currentX = Math.max(-572, Math.min(this.currentX, max));

    this.highlightsCards.style.transform = `translateX(${this.currentX}px)`;

    this.rafId = requestAnimationFrame(this.animate.bind(this));
  }

  ngOnDestroy() {
    this.highlightsCards.removeEventListener('pointerdown', this.onPointerDown);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);

    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}