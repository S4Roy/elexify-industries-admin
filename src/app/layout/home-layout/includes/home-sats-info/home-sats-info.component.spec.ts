import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSatsInfoComponent } from './home-sats-info.component';

describe('HomeSatsInfoComponent', () => {
  let component: HomeSatsInfoComponent;
  let fixture: ComponentFixture<HomeSatsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSatsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSatsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
