import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRoadmapInfoCardComponent } from './about-roadmap-info-card.component';

describe('AboutRoadmapInfoCardComponent', () => {
  let component: AboutRoadmapInfoCardComponent;
  let fixture: ComponentFixture<AboutRoadmapInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutRoadmapInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutRoadmapInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
