import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromCustomer from 'src/app/store/actions/customer.actions';
import { selectCustomer } from 'src/app/store/selectors/customer.selectors';
import { IAppState } from 'src/app/store/state/app.state';
import { Customer } from '../../models/customer';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  customer$: Observable<Customer>;
  customer: Customer;

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('id');
    if (customerId) {
      this.store.dispatch(fromCustomer.GetCustomer({ id: customerId }));
    }

    this.setCustomer();
  }

  setCustomer() {
    this.customer$ = this.store
      .pipe(select(selectCustomer))
      .pipe(takeUntil(this.destroy$));
    this.customer$.subscribe((data) => {
      this.customer = data;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
