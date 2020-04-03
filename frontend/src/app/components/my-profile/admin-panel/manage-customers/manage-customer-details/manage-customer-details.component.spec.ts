import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCustomerDetailsComponent } from './manage-customer-details.component';

describe('ManageCustomerDetailsComponent', () => {
  let component: ManageCustomerDetailsComponent;
  let fixture: ComponentFixture<ManageCustomerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCustomerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
