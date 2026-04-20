import { TestBed } from '@angular/core/testing';

import { QuestionValuesServices } from './question-values';

describe('QuestionValues', () => {
  let service: QuestionValuesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionValuesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
