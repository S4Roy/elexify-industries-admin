import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCredentialsComponent } from './new-credentials.component';

describe('NewCredentialsComponent', () => {
  let component: NewCredentialsComponent;
  let fixture: ComponentFixture<NewCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCredentialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
