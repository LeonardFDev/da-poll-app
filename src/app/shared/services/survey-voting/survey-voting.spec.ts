import { TestBed } from '@angular/core/testing';

import { SurveyVotingService } from './survey-voting';

describe('SurveyVoting', () => {
  let service: SurveyVotingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyVotingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
