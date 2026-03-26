import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightsCard } from './highlights-card';

describe('HighlightsCard', () => {
  let component: HighlightsCard;
  let fixture: ComponentFixture<HighlightsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(HighlightsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
