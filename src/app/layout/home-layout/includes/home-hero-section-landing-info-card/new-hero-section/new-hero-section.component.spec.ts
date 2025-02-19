import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHeroSectionComponent } from './new-hero-section.component';

describe('NewHeroSectionComponent', () => {
  let component: NewHeroSectionComponent;
  let fixture: ComponentFixture<NewHeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHeroSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
