import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScalablepressComponent } from './scalablepress.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ScalablepressComponent }
    ])],
    exports: [RouterModule]
})
export class ScalablepressRoutingModule { }