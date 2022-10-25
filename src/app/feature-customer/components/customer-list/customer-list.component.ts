import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { v4 as uuid } from 'uuid';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectCustomers } from 'src/app/store/selectors/customer.selectors';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers$ = this.store.pipe(select(selectCustomers));

  customerList: Customer[] = [
    new Customer(uuid(), 'Joe', 'Doe', 'active', 'joe@ce.com'),
    new Customer(uuid(), 'Jane', 'Doe', 'inactive', 'jane@ce.com'),
    new Customer(uuid(), 'Jack', 'Doe', 'pending', 'jack@ce.com'),
    new Customer(uuid(), 'Jane', 'Doe', 'inactive', 'jane@ce.com'),
    new Customer(uuid(), 'Jack', 'Doe', 'pending', 'jack@ce.com'),
  ];

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
  }

}
