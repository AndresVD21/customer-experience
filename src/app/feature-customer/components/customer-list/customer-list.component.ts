import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '../../models/customer';
import { v4 as uuid } from 'uuid';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectCustomers } from 'src/app/store/selectors/customer.selectors';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<boolean>();

  customers$: Observable<Customer[]>;
  customers: Customer[];
  filterCustomers: Customer[];

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.setCustomers();
  }

  setCustomers() {
    this.customers$ = this.store
      .pipe(select(selectCustomers));
    this.customers$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.customers = [...data];
        this.filterCustomers = [...data]
      });
  }


  filterCustomerList(filter: string) {
    console.log(filter)
    if (filter.trim().length === 0) {
      this.filterCustomers = [...this.customers];
      return;
    }
    this.filterCustomers = this.customers.filter(customer => customer.lastName.toLowerCase().startsWith(filter))
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
