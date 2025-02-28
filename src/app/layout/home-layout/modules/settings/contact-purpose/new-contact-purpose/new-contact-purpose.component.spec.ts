import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContactPurposeComponent } from './new-contact-purpose.component';

describe('NewContactPurposeComponent', () => {
  let component: NewContactPurposeComponent;
  let fixture: ComponentFixture<NewContactPurposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewContactPurposeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewContactPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
