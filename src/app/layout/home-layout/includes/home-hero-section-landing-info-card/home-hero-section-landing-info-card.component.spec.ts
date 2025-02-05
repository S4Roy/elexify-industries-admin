import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeroSectionLandingInfoCardComponent } from './home-hero-section-landing-info-card.component';

describe('HomeHeroSectionLandingInfoCardComponent', () => {
  let component: HomeHeroSectionLandingInfoCardComponent;
  let fixture: ComponentFixture<HomeHeroSectionLandingInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHeroSectionLandingInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHeroSectionLandingInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
