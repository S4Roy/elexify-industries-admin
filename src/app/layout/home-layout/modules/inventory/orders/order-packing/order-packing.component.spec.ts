import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPackingComponent } from './order-packing.component';

describe('OrderPackingComponent', () => {
  let component: OrderPackingComponent;
  let fixture: ComponentFixture<OrderPackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
