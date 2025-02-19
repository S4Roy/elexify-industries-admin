import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMediaInfoCardComponent } from './home-media-info-card.component';

describe('HomeMediaInfoCardComponent', () => {
  let component: HomeMediaInfoCardComponent;
  let fixture: ComponentFixture<HomeMediaInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMediaInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMediaInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
