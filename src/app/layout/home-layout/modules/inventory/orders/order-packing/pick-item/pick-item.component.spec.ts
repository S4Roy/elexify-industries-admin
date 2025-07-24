import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickItemComponent } from './pick-item.component';

describe('PickItemComponent', () => {
  let component: PickItemComponent;
  let fixture: ComponentFixture<PickItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
