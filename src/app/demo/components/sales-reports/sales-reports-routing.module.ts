import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SalesReportsComponent } from './sales-reports.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SalesReportsComponent }
    ])],
    exports: [RouterModule]
})
export class SalesReportsRoutingModule { }