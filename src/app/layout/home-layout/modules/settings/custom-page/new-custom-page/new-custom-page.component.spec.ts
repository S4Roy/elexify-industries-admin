import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomPageComponent } from './new-custom-page.component';

describe('NewCustomPageComponent', () => {
  let component: NewCustomPageComponent;
  let fixture: ComponentFixture<NewCustomPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCustomPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCustomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
