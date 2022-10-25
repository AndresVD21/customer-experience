import { ICustomerState, initialCustomerState } from "./customer.state";

export interface IAppState {
    customers: ICustomerState;
};

export const initialAppState: IAppState = {
    customers: initialCustomerState
};

export function getInitialState(): IAppState {
    return initialAppState;
}

