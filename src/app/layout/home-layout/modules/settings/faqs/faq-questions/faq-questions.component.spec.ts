import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqQuestionsComponent } from './faq-questions.component';

describe('FaqQuestionsComponent', () => {
  let component: FaqQuestionsComponent;
  let fixture: ComponentFixture<FaqQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
