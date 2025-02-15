import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTestimonialsInfoComponent } from './home-testimonials-info.component';

describe('HomeTestimonialsInfoComponent', () => {
  let component: HomeTestimonialsInfoComponent;
  let fixture: ComponentFixture<HomeTestimonialsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTestimonialsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTestimonialsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
