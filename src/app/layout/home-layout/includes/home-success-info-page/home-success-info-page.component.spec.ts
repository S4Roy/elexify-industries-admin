import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSuccessInfoPageComponent } from './home-success-info-page.component';

describe('HomeSuccessInfoPageComponent', () => {
  let component: HomeSuccessInfoPageComponent;
  let fixture: ComponentFixture<HomeSuccessInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSuccessInfoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSuccessInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
