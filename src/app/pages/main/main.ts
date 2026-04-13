import { Component, ElementRef, ViewChild } from '@angular/core';
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
export class Main {
  @ViewChild('highlightsCards') highlightsCardsRef!: ElementRef<HTMLElement>;
  highlightsCards!:HTMLElement;

  startX = 0;
  currentX = 0;
  lastX = 0;
  velocity = 0;
  dragging = false;
  // moved = false;
  rafId: number | null = null;

  ngAfterViewInit(){
    this.highlightsCards = this.highlightsCardsRef.nativeElement;

    this.highlightsCards.addEventListener('pointerdown', (event) => this.onPointerDown(event));
    this.highlightsCards.addEventListener('pointermove', (event) => this.onPointerMove(event));
    this.highlightsCards.addEventListener('pointerup', (event) => this.onPointerUp(event));
    this.highlightsCards.addEventListener('pointercancel', (event) => this.onPointerUp(event));
  }

  // logId(event: PointerEvent) {
  //   const id = (event.target as HTMLElement).id;
  //   console.log(id);
  // }

  onPointerDown (e: PointerEvent) {
    if (e.button !== 0) return;
    // this.moved = false;

    this.dragging = true;
    this.startX = e.clientX - this.currentX;
    
    this.lastX = e.clientX;

    this.velocity = 0;

    this.highlightsCards.setPointerCapture(e.pointerId);

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  onPointerMove(e: PointerEvent) {
    if (!this.dragging) return;
    // this.moved = true;

    let newX = e.clientX - this.startX;
    let dx = e.clientX - this.lastX;
    this.velocity = dx / 10;
    this.lastX = e.clientX;

    const max = this.highlightsCards.offsetWidth - this.highlightsCards.children[0].clientWidth -12
    newX = Math.max(-572, Math.min(newX, max));

    this.currentX = newX;

    this.highlightsCards.style.transform = `translateX(${this.currentX}px)`;
  }

  onPointerUp(e: PointerEvent){
    // if(this.velocity == 0) this.logId(e);

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