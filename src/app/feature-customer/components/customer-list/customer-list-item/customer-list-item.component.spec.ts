import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { StatusPillComponent } from 'src/app/shared/components/status-pill/status-pill.component';
import { Customers } from 'src/app/utils/mock/customers';

import { CustomerListItemComponent } from './customer-list-item.component';

describe('CustomerListItemComponent', () => {
  let component: CustomerListItemComponent;
  let fixture: ComponentFixture<CustomerListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CustomerListItemComponent,
        MockComponent(StatusPillComponent)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerListItemComponent);
    component = fixture.componentInstance;
    component.customer = Customers[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
