import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPurposeComponent } from './contact-purpose.component';

describe('ContactPurposeComponent', () => {
  let component: ContactPurposeComponent;
  let fixture: ComponentFixture<ContactPurposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPurposeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
