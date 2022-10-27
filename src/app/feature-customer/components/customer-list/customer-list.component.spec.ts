import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';
import { first } from 'rxjs/operators';
import { Customers } from 'src/app/utils/mock/customers';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';
import { CustomerListItemComponent } from './customer-list-item/customer-list-item.component';

import { CustomerListComponent } from './customer-list.component';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;

  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  
  const initialState = {
    customers: Customers,
    customerSelected: Customers[0],
  };

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CustomerListComponent,
        MockComponent(CustomerListItemComponent),
        MockComponent(CustomerFilterComponent)
      ],
      providers: [
        { provide: Router, useValue: router },
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter customer list', () => {
    component.customers = [...Customers];
    component.filterCustomers = [...Customers];    
    component.filterCustomerList('atest2');
    expect(component.filterCustomers.length).toBe(1);
  });

  it('should not filter customer list', () => {
    component.customers = [...Customers];
    component.filterCustomers = [...Customers];    
    component.filterCustomerList('');
    expect(component.filterCustomers.length).toBe(3);
  });

  it('should sort customer list by firstname', () => {
    component.filterCustomers = [...Customers];
    component.sortListByProperty('firstName');
    expect(component.filterCustomers[0].firstName.charAt(0)).toBe('a');
  });

  it('should navigate when new customer', () => {
    component.addCustomer();
    expect(router.navigate).toHaveBeenCalledWith(['new']);
  });



});
