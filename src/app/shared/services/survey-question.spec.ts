import { TestBed } from '@angular/core/testing';

import { SurveyQuestionServices } from './survey-question';

describe('SurveyQuestionServices', () => {
  let service: SurveyQuestionServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyQuestionServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
