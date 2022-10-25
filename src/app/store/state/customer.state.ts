import { Customer } from "src/app/feature-customer/models/customer";

export interface ICustomerState {
    customers: Customer[];
    customerSelected: Customer | null;
}

export const initialCustomerState: ICustomerState = {
    customers: [],
    customerSelected: null
}