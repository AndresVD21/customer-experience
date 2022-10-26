import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as fromCustomer from '../actions/customer.actions';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IAppState } from '../state/app.state';
import { select, Store } from '@ngrx/store';
import { selectCustomers } from '../selectors/customer.selectors';

@Injectable()
export class CustomerEffects {
  getCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCustomer.GetCustomer),
      map((action) => {
        return action.id;
      }),
      withLatestFrom(this.store.pipe(select(selectCustomers))),
      switchMap(([id, customers]) => {
        const selectedCustomer = customers.filter(
          (customer) => customer.id === id
        )[0];
        return of(fromCustomer.SetCustomer({ customer: selectedCustomer }));
      })
    )
  );

  editCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCustomer.EditCustomer),
      map((action) => {
        return action.customer;
      }),
      withLatestFrom(this.store.pipe(select(selectCustomers))),
      switchMap(([customer, customers]) => {
        const customerEditedIndex = customers.findIndex(
            (costumer) => costumer.id === customer.id
          );
          const customersCopy = [...customers];
          customersCopy.splice(customerEditedIndex, 1, customer);
          localStorage.setItem('customers', JSON.stringify(customersCopy));
          return of(fromCustomer.SetCustomers({ customers: customersCopy }));
      })
    )
  );

  addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCustomer.AddCustomer),
      map((action) => {
        return action.customer;
      }),
      withLatestFrom(this.store.pipe(select(selectCustomers))),
      switchMap(([customer, customers]) => {
          const customersCopy = [...customers];
          customersCopy.push(customer);
          localStorage.setItem('customers', JSON.stringify(customersCopy));
          return of(fromCustomer.SetCustomers({ customers: customersCopy }));
      })
    )
  );

  constructor(private actions$: Actions, private store: Store<IAppState>) {}
}
