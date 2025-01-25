import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSection4LandingServiceInfoCardComponent } from './home-section4-landing-service-info-card.component';

describe('HomeSection4LandingServiceInfoCardComponent', () => {
  let component: HomeSection4LandingServiceInfoCardComponent;
  let fixture: ComponentFixture<HomeSection4LandingServiceInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSection4LandingServiceInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSection4LandingServiceInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
