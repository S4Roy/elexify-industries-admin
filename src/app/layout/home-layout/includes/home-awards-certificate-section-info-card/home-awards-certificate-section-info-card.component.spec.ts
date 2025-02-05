import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAwardsCertificateSectionInfoCardComponent } from './home-awards-certificate-section-info-card.component';

describe('HomeAwardsCertificateSectionInfoCardComponent', () => {
  let component: HomeAwardsCertificateSectionInfoCardComponent;
  let fixture: ComponentFixture<HomeAwardsCertificateSectionInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAwardsCertificateSectionInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAwardsCertificateSectionInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
