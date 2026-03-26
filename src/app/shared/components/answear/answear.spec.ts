import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Answear } from './answear';

describe('Answear', () => {
  let component: Answear;
  let fixture: ComponentFixture<Answear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Answear],
    }).compileComponents();

    fixture = TestBed.createComponent(Answear);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
