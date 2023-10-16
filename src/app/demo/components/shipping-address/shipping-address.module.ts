import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingAddressRoutingModule } from './shipping-address-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ShippingAddressComponent } from './shipping-address.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ShippingAddressComponent],
  imports: [
    CommonModule,
    ShippingAddressRoutingModule,
    InputTextModule,
    TableModule,
    ToastModule,
    DropdownModule,
    ButtonModule,
    MultiSelectModule,
    FormsModule
  ]
})
export class ShippingAddressModule { }
