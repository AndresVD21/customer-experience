import {Action, createAction, props} from '@ngrx/store';
import { Customer } from 'src/app/feature-customer/models/customer';

export enum ECustomerActions {
    GetCustomers = '[Customer] Get Customers',
    GetCustomer = '[Customer] Get Customer',
    SetCustomers = '[Customer] Set Customers',
    SetCustomer = '[Customer] Set Customer',
    AddCustomer = '[Customer] Add Customer',
    EditCustomer = '[Customer] Edit Customer',
}


export const GetCustomers = createAction(ECustomerActions.GetCustomers);

export const GetCustomer = createAction(ECustomerActions.GetCustomer, props<{id: string}>());

export const SetCustomers = createAction(ECustomerActions.SetCustomers, props<{customers: Customer[]}>());

export const SetCustomer = createAction(ECustomerActions.SetCustomer, props<{customer: Customer}>());

export const AddCustomer = createAction(ECustomerActions.AddCustomer, props<{customer: Customer}>());

export const EditCustomer = createAction(ECustomerActions.EditCustomer, props<{customer: Customer}>());
