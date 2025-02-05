import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProgressSectionInfoCardComponent } from './home-progress-section-info-card.component';

describe('HomeProgressSectionInfoCardComponent', () => {
  let component: HomeProgressSectionInfoCardComponent;
  let fixture: ComponentFixture<HomeProgressSectionInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProgressSectionInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProgressSectionInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
