import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyStatus } from './survey-status';

describe('SurveyStatus', () => {
  let component: SurveyStatus;
  let fixture: ComponentFixture<SurveyStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
