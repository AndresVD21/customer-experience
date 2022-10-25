import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { customerReducers } from "./customer.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
    customers: customerReducers
}