import { Component, OnInit } from '@angular/core';
import { Customer } from './feature-customer/models/customer';
import { v4 as uuid } from 'uuid';
import { UsersService } from './services/users.service';
import { Store } from '@ngrx/store';
import * as fromCustomer from './store/actions/customer.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  customers: Customer[];

  constructor(private usersService: UsersService, private store: Store) {}

  ngOnInit() {
    this.getUsers();
  }

  setCustomersLocalStorage(customers: Customer[]) {
    localStorage.setItem('customers', JSON.stringify(customers));
  }

  getCustomersFromLocalStorage(): Customer[] {
    return JSON.parse(localStorage.getItem('customers'));
  }

  isDataInLocal() {
    const data = localStorage.getItem('customers');
    if (data) {
      return true;
    }
    return false;
  }

  getUsers() {
    if (this.isDataInLocal()) {
      const customersStored = this.getCustomersFromLocalStorage();
      this.store.dispatch(fromCustomer.SetCustomers({customers: customersStored}));
    } else {
      this.usersService.getUsers().subscribe(data => {
        this.setCustomersLocalStorage(data)
        this.store.dispatch(fromCustomer.SetCustomers({customers: data}));
      });
    }
  }
}
