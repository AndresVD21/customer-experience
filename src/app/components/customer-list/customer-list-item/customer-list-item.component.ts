import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-list-item',
  templateUrl: './customer-list-item.component.html',
  styleUrls: ['./customer-list-item.component.scss']
})
export class CustomerListItemComponent implements OnInit {

  @Input() customer: Customer;

  constructor() { }

  ngOnInit(): void {
  }

}
