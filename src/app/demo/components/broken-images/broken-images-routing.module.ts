import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrokenImagesComponent } from './broken-images.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BrokenImagesComponent }
    ])],
    exports: [RouterModule]
})
export class BrokenImagesRoutingModule { }