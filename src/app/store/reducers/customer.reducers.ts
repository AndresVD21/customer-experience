import { initialCustomerState, ICustomerState } from '../state/customer.state';
import * as CustomerActions from '../actions/customer.actions';
import { createReducer, on } from '@ngrx/store';

export const customerReducers = createReducer(
  initialCustomerState,
  on(CustomerActions.SetCustomers, (state, props) => {
    return { ...state, customers: [...props.customers] };
  }),
  on(CustomerActions.SetCustomer, (state, props) => {
    return { ...state, customerSelected: { ...props.customer } };
  })
);
