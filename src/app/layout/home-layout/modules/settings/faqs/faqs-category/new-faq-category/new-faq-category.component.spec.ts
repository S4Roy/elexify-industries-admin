import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFaqCategoryComponent } from './new-faq-category.component';

describe('NewFaqCategoryComponent', () => {
  let component: NewFaqCategoryComponent;
  let fixture: ComponentFixture<NewFaqCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFaqCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFaqCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
