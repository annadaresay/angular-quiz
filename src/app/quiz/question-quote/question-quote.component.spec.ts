import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionQuoteComponent } from './question-quote.component';

describe('QuestionQuoteComponent', () => {
  let component: QuestionQuoteComponent;
  let fixture: ComponentFixture<QuestionQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
