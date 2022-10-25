import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../../models/customer';

@Component({
  selector: 'app-customer-list-item',
  templateUrl: './customer-list-item.component.html',
  styleUrls: ['./customer-list-item.component.scss']
})
export class CustomerListItemComponent implements OnInit {

  @Input() customer: Customer;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToDetails() {
    this.router.navigate([this.customer.id]);
  }

}
