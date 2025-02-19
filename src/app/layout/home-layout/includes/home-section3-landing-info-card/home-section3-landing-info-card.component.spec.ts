import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSection3LandingInfoCardComponent } from './home-section3-landing-info-card.component';

describe('HomeSection3LandingInfoCardComponent', () => {
  let component: HomeSection3LandingInfoCardComponent;
  let fixture: ComponentFixture<HomeSection3LandingInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSection3LandingInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSection3LandingInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
