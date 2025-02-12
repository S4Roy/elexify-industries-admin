import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMediaInfoCardComponent } from './new-media-info-card.component';

describe('NewMediaInfoCardComponent', () => {
  let component: NewMediaInfoCardComponent;
  let fixture: ComponentFixture<NewMediaInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMediaInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMediaInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
