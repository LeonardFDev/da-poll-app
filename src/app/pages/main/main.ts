import { Component, ElementRef, HostListener, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PrimaryButton } from "../../shared/components/primary-button/primary-button";
import { HeroImage } from "../../shared/components/hero-image/hero-image";
import { HighlightsCard } from "../../shared/components/highlights-card/highlights-card";
import { DropDownMenu } from "../../shared/components/drop-down-menu/drop-down-menu";
import { FilterButton } from "../../shared/components/filter-button/filter-button";
import { SurveyView } from "../../shared/components/survey-view/survey-view";
import { SetQuestionsServices } from '../../shared/services/set-questions/set-questions';

@Component({
  selector: 'app-main',
  imports: [PrimaryButton, HeroImage, HighlightsCard, DropDownMenu, FilterButton, SurveyView, RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  router = inject(Router);
  setQuestion = inject(SetQuestionsServices);

  @ViewChild('highlightsCards') highlightsCardsRef!: ElementRef<HTMLElement>;
  highlightsCards!:HTMLElement;

  startX = 0;
  currentX = 0;
  lastX = 0;
  velocity = 0;
  dragging = false;
  rafId: number | null = null;

  mqMaxW1312 = window.matchMedia('(max-width: 1312px)');
  mqMaxW1440 = window.matchMedia('(max-width: 1440px)');

  heroSwitch:WritableSignal<boolean> = signal(false);
  scrollActiv:WritableSignal<boolean> = signal(false);

  @HostListener('window:resize')
  onResize() {
    this.currentX = 0;
    this.highlightsCards.style.removeProperty('transform');
  }

  ngOnInit(){
    this.heroSwitch.set(this.mqMaxW1312.matches);
    this.scrollActiv.set(this.mqMaxW1440.matches);

    this.mqMaxW1312.addEventListener('change', e => {
      this.heroSwitch.set(e.matches);
    });

    this.mqMaxW1440.addEventListener('change', e => {
      this.scrollActiv.set(e.matches);
    });
  }

  ngAfterViewInit(){
    this.highlightsCards = this.highlightsCardsRef.nativeElement;

    this.highlightsCards.addEventListener('pointerdown', (event) => this.onPointerDown(event));
    this.highlightsCards.addEventListener('pointermove', (event) => this.onPointerMove(event));
    window.addEventListener('pointerup', (event) => this.onPointerUp(event));
    this.highlightsCards.addEventListener('wheel', (event) => this.onWhell(event));
    this.highlightsCards.addEventListener('pointercancel', (event) => this.onPointerUp(event));
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
    if (!this.dragging || !this.scrollActiv()) return;
    
    let newX = e.clientX - this.startX;
    let dx = e.clientX - this.lastX;

    this.velocity = dx / 10;
    this.lastX = e.clientX;

    newX = Math.max(-this.maxCalculate(), Math.min(newX, 0));

    this.currentX = newX;
    this.highlightsCards.style.transform = `translateX(${this.currentX}px)`;
  }

  onWhell(event: WheelEvent){
    if (!this.scrollActiv()) return;
    event.preventDefault();
    
    if (event.deltaY > 0) {
      this.currentX += 20;
      if(this.currentX > 0) this.currentX = 0;
    } 
    else if (event.deltaY < 0) {
      this.currentX -= 20;
      if(this.currentX < -this.maxCalculate()) this.currentX = -this.maxCalculate();
    }

    this.highlightsCards.style.transform = `translateX(${this.currentX}px)`;
  }

  maxCalculate(){
    const totalCalculationGap = parseFloat(getComputedStyle(this.highlightsCards).gap) *2;
    const totalCalculationCards = parseFloat(getComputedStyle(this.highlightsCards.children[0]).width) *3

    const totalCalculationGapCards = totalCalculationGap + totalCalculationCards;
        
    const visibleArea = Number(this.highlightsCards.parentElement?.getBoundingClientRect().width.toFixed(3));

    const max = totalCalculationGapCards - visibleArea;

    return max
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
    this.velocity *= 0.85;

    if (Math.abs(this.velocity) < 0.02) {
      this.velocity = 0;
      return;
    }

    this.currentX += this.velocity * 16;
    this.currentX = Math.max(-this.maxCalculate(), Math.min(this.currentX, 0));
    this.highlightsCards.style.transform = `translateX(${this.currentX}px)`;
    this.rafId = requestAnimationFrame(this.animate.bind(this));
  }

  ngOnDestroy() {
    this.highlightsCards.removeEventListener('pointerdown', this.onPointerDown);
    this.highlightsCards.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    this.highlightsCards.removeEventListener('wheel', this.onWhell);
    this.highlightsCards.removeEventListener('pointercancel', this.onPointerUp);

    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  threeEndingSoon(){
    // coming soon
  }
}