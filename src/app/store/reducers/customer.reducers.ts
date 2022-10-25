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
  }),
  on(CustomerActions.EditCustomer, (state, props) => {
    const customerEditedIndex = state.customers.findIndex(
      (costumer) => costumer.id === props.customer.id
    );
    const customersCopy = [...state.customers];
    customersCopy.splice(customerEditedIndex, 1, props.customer);
    return { ...state, customers: [...customersCopy] };
  }),
  on(CustomerActions.AddCustomer, (state, props) => {
    return {
      ...state,
      customers: [...state.customers, props.customer],
    };
  })
);
