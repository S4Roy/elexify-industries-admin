import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCareerSectionInfoCardComponent } from './home-career-section-info-card.component';

describe('HomeCareerSectionInfoCardComponent', () => {
  let component: HomeCareerSectionInfoCardComponent;
  let fixture: ComponentFixture<HomeCareerSectionInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCareerSectionInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCareerSectionInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
