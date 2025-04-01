import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveContentComponent } from './approve-content.component';

describe('ApproveContentComponent', () => {
  let component: ApproveContentComponent;
  let fixture: ComponentFixture<ApproveContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
