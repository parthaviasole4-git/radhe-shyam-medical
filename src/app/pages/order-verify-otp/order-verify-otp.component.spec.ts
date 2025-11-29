import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderVerifyOtpComponent } from './order-verify-otp.component';

describe('OrderVerifyOtpComponent', () => {
  let component: OrderVerifyOtpComponent;
  let fixture: ComponentFixture<OrderVerifyOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderVerifyOtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
