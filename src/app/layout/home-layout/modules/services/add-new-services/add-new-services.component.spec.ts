import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewServicesComponent } from './add-new-services.component';

describe('AddNewServicesComponent', () => {
  let component: AddNewServicesComponent;
  let fixture: ComponentFixture<AddNewServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
