import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSection2LandingInfoCardComponent } from './home-section2-landing-info-card.component';

describe('HomeSection2LandingInfoCardComponent', () => {
  let component: HomeSection2LandingInfoCardComponent;
  let fixture: ComponentFixture<HomeSection2LandingInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSection2LandingInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSection2LandingInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
