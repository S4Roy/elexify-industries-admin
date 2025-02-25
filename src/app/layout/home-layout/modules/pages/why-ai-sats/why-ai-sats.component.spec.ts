import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyAiSatsComponent } from './why-ai-sats.component';

describe('WhyAiSatsComponent', () => {
  let component: WhyAiSatsComponent;
  let fixture: ComponentFixture<WhyAiSatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyAiSatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyAiSatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
