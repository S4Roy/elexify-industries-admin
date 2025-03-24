import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentApprovalsComponent } from './content-approvals.component';

describe('ContentApprovalsComponent', () => {
  let component: ContentApprovalsComponent;
  let fixture: ComponentFixture<ContentApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentApprovalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
