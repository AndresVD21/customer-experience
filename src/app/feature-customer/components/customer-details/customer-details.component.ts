import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromCustomer from 'src/app/store/actions/customer.actions';
import { selectCustomer } from 'src/app/store/selectors/customer.selectors';
import { IAppState } from 'src/app/store/state/app.state';
import { Customer } from '../../models/customer';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  customer$: Observable<Customer>;
  customer: Customer;

  editMode = false;
  customerForm: FormGroup;

  constructor(
    private store: Store<IAppState>, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('id');
    if (customerId) {
      this.store.dispatch(fromCustomer.GetCustomer({ id: customerId }));
    }

    this.setCustomer();
    this.initForm();
  }

  initForm() {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      status: ['', Validators.required],
      email: ['',[ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
  }

  setFormData(customer: Customer) {
    this.customerForm.setValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      status: customer.status
    })
  }

  setCustomer() {
    this.customer$ = this.store
      .pipe(select(selectCustomer))
      .pipe(takeUntil(this.destroy$));
    this.customer$.subscribe((data) => {
      this.customer = data;
    });
  }

  setEditMode() {
    this.editMode = true;
    this.setFormData(this.customer);
  }

  saveData() {
    const { firstName, lastName, status, email } = this.customerForm.value;
    const customer = new Customer(this.customer.id, firstName, lastName, status, email, this.customer.phone);
    this.store.dispatch(fromCustomer.EditCustomer({customer}));
    this.editMode = false;
    this.store.dispatch(fromCustomer.GetCustomer({ id: this.customer.id }));
    this.customerForm.reset();
  }

  cancelEdit() {
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
