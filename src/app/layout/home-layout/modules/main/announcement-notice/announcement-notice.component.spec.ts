import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementNoticeComponent } from './announcement-notice.component';

describe('AnnouncementNoticeComponent', () => {
  let component: AnnouncementNoticeComponent;
  let fixture: ComponentFixture<AnnouncementNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementNoticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
