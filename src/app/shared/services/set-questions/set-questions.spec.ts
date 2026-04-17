import { TestBed } from '@angular/core/testing';

import { SetQuestionsServices } from './set-questions';

describe('SetQuestions', () => {
  let service: SetQuestionsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetQuestionsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
