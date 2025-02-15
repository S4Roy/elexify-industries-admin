import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMoreSatsInfoComponent } from './home-more-sats-info.component';

describe('HomeMoreSatsInfoComponent', () => {
  let component: HomeMoreSatsInfoComponent;
  let fixture: ComponentFixture<HomeMoreSatsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMoreSatsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMoreSatsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
