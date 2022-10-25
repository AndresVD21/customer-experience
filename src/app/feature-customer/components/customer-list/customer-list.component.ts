import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customerList: Customer[] = [
    new Customer(uuid(), 'Joe', 'Doe', 'active', 'joe@ce.com'),
    new Customer(uuid(), 'Jane', 'Doe', 'inactive', 'jane@ce.com'),
    new Customer(uuid(), 'Jack', 'Doe', 'pending', 'jack@ce.com'),
    new Customer(uuid(), 'Jane', 'Doe', 'inactive', 'jane@ce.com'),
    new Customer(uuid(), 'Jack', 'Doe', 'pending', 'jack@ce.com'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
