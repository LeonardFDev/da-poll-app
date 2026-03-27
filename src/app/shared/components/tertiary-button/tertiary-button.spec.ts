import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TertiaryButton } from './tertiary-button';

describe('TertiaryButton', () => {
  let component: TertiaryButton;
  let fixture: ComponentFixture<TertiaryButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TertiaryButton],
    }).compileComponents();

    fixture = TestBed.createComponent(TertiaryButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
