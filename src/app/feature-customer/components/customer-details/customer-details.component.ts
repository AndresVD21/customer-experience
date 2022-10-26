import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromCustomer from 'src/app/store/actions/customer.actions';
import { selectCustomer } from 'src/app/store/selectors/customer.selectors';
import { IAppState } from 'src/app/store/state/app.state';
import { Customer } from '../../models/customer';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { formatPhone, revertPhoneFormat } from 'src/app/utils/utils';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {

  NEW_PARAM = 'new';

  private destroy$ = new Subject<boolean>();

  customer$: Observable<Customer>;
  customer: Customer;

  editMode = false;
  customerForm: FormGroup;

  isNewCustomer = true;

  constructor(
    private store: Store<IAppState>, 
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('id');
    if (customerId !== this.NEW_PARAM) {
      this.isNewCustomer = false;
      if (customerId) {
        this.store.dispatch(fromCustomer.GetCustomer({ id: customerId }));
      }
      this.setCustomer();
    } else {
      this.editMode = true;
    }

    this.initForm();
  }

  initForm() {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      status: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      email: ['',[ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
  }

  setFormData(customer: Customer) {
    this.customerForm.setValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: revertPhoneFormat(customer.phone),
      email: customer.email,
      status: customer.status
    })
  }

  setCustomer() {
    this.customer$ = this.store
      .pipe(select(selectCustomer));
    this.customer$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
      this.customer = data;
    });
  }

  setEditMode() {
    this.editMode = true;
    this.setFormData(this.customer);
  }

  saveData() {
    const { firstName, lastName, status, email, phone } = this.customerForm.value;
    const phoneFormatted = formatPhone(phone);
    if (!this.isNewCustomer) {
      const customer = new Customer(this.customer.id, firstName, lastName, status, email, phoneFormatted);
      this.store.dispatch(fromCustomer.EditCustomer({customer}));
      this.editMode = false;
      this.store.dispatch(fromCustomer.GetCustomer({ id: this.customer.id }));
    } else {
      const newId = uuid();
      const customer = new Customer(newId, firstName, lastName, status, email, phoneFormatted);
      this.store.dispatch(fromCustomer.AddCustomer({customer}));
      this.router.navigate(['/']);
      
    }
    this.customerForm.reset();
  }

  cancelEdit() {
    if (this.isNewCustomer) {
      this.router.navigate(['/']);
    }
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
