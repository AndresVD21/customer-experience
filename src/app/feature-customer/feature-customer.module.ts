import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerListItemComponent } from './components/customer-list/customer-list-item/customer-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { FeatureCustomerRoutingModule } from './feature-customer-routing.module';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerFilterComponent } from './components/customer-list/customer-filter/customer-filter.component';



@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerListItemComponent,
    CustomerDetailsComponent,
    CustomerFilterComponent,
  ],
  imports: [
    CommonModule,
    FeatureCustomerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FeatureCustomerModule { }
