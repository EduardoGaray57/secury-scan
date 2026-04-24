import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChecker } from './password-checker';

describe('PasswordChecker', () => {
  let component: PasswordChecker;
  let fixture: ComponentFixture<PasswordChecker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordChecker],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordChecker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
