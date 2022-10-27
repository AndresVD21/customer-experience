import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '../../models/customer';
import { v4 as uuid } from 'uuid';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectCustomers } from 'src/app/store/selectors/customer.selectors';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  FIRSTNAME = 'firstName';
  LASTNAME = 'lastName';
  STATUS = 'status';
  NO_SORT = 'noSort';

  private destroy$ = new Subject<boolean>();

  customers$: Observable<Customer[]>;
  customers: Customer[];
  filterCustomers: Customer[];

  constructor(private store: Store<IAppState>, private router: Router) {}

  ngOnInit(): void {
    this.setCustomers();
  }

  setCustomers() {
    this.customers$ = this.store.pipe(select(selectCustomers));
    this.customers$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.customers = [...data];
      this.filterCustomers = [...data];
    });
  }

  filterCustomerList(filter: string) {
    if (filter.trim().length === 0) {
      this.filterCustomers = [...this.customers];
      return;
    }
    this.filterCustomers = this.customers.filter((customer) =>
      customer.lastName.toLowerCase().startsWith(filter)
    );
  }

  sortListChange(sortValue: string) {
    this.sortListByProperty(sortValue);
  }

  sortListByProperty(property: string) {
    switch (property) {
      case this.FIRSTNAME:
        this.filterCustomers = this.filterCustomers.sort((a, b) =>
          a.firstName < b.firstName ? -1 : 1
        );
        break;
      case this.LASTNAME:
        this.filterCustomers = this.filterCustomers.sort((a, b) =>
          a.lastName < b.lastName ? -1 : 1
        );
        break;
      case this.STATUS:
        this.filterCustomers = this.filterCustomers.sort((a, b) =>
          a.status < b.status ? -1 : 1
        );
        break;
      default:
        this.filterCustomers = [...this.customers];
        break;
    }
  }

  addCustomer() {
    this.router.navigate(['new']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
