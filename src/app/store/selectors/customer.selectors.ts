import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { ICustomerState } from "../state/customer.state";

const customerState = (state: IAppState) => state.customers;

export const selectCustomers = createSelector(customerState, (state: ICustomerState) => state.customers);
export const selectCustomer = createSelector(customerState, (state: ICustomerState) => state.customerSelected);
