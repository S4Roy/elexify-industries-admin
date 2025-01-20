import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFaqQuestionComponent } from './new-faq-question.component';

describe('NewFaqQuestionComponent', () => {
  let component: NewFaqQuestionComponent;
  let fixture: ComponentFixture<NewFaqQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFaqQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFaqQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
