import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkOutForDeliveryComponent } from './mark-out-for-delivery.component';

describe('MarkOutForDeliveryComponent', () => {
  let component: MarkOutForDeliveryComponent;
  let fixture: ComponentFixture<MarkOutForDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkOutForDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkOutForDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
