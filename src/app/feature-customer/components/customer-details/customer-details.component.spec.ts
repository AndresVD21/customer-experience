import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Customer } from '../../models/customer';
import { CustomerDetailsComponent } from './customer-details.component';
import { Customers } from 'src/app/utils/mock/customers';
import { By } from '@angular/platform-browser';
import { StatusPillComponent } from 'src/app/shared/components/status-pill/status-pill.component';
import { MockComponent } from 'ng-mocks';
import { EditCustomer } from 'src/app/store/actions/customer.actions';

describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;
  let formBuilder: FormBuilder;
  let store: MockStore;
  let activatedRouteSpy;

  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  const initialState = {
    customers: Customers,
    customerSelected: Customers[0],
  };

  beforeEach(() => {
    activatedRouteSpy = {
      snapshot: {
        paramMap: convertToParamMap({
          id: '001',
        })
      }
    };
    TestBed.configureTestingModule({
      declarations: [CustomerDetailsComponent, MockComponent(StatusPillComponent)],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy,
        },
        { provide: Router, useValue: router },
        FormBuilder,
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsComponent);
    component = fixture.componentInstance;
    
    formBuilder = TestBed.inject(FormBuilder);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    component.customer = Customers[0];
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.customerForm).toBeDefined();
  });

  it('should render proper status pill', () => {
    component.customer = Customers[0];
    fixture.detectChanges();
    const statusPillEl = fixture.debugElement.query(By.directive(StatusPillComponent));
    expect(statusPillEl).toBeTruthy();
    const statusPill = statusPillEl.componentInstance;
    expect(statusPill.status).toBe('active');
  });

  it('should set form data', () => {
    const expectedValue = Customers[0];
    component.customer = Customers[0];
    fixture.detectChanges();
    component.setFormData(component.customer);
    expect(component.customerForm.value.firstName).toEqual(expectedValue.firstName);
  });

  it('should save data and dispatch to store when edit', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough(); // spy on the store 
    component.customer = Customers[0];
    fixture.detectChanges();
    component.setFormData(component.customer);
    component.isNewCustomer = false;
    component.saveData();
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
  });

  it('should save data and dispatch to store when new', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough(); // spy on the store 
    component.customer = Customers[0];
    fixture.detectChanges();
    component.setFormData(component.customer);
    component.isNewCustomer = true;
    component.saveData();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate back when cancel on new customer screen', () => {
    component.isNewCustomer = true;
    component.cancelEdit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
