import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShutterstockComponent } from './shutterstock.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ShutterstockComponent }
    ])],
    exports: [RouterModule]
})
export class ShutterstockRoutingModule { }