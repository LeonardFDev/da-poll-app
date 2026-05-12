import { TestBed } from '@angular/core/testing';

import { GetSurveyDatabaseService } from './get-survey-database';

describe('GetSurveyDatabase', () => {
  let service: GetSurveyDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSurveyDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
