import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShippingAddressComponent } from './shipping-address.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ShippingAddressComponent }
    ])],
    exports: [RouterModule]
})
export class ShippingAddressRoutingModule { }