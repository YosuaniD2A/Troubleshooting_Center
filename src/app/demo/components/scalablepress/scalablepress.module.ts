import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScalablepressRoutingModule } from './scalablepress-routing.module';
import { ScalablepressComponent } from './scalablepress.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';


@NgModule({
  declarations: [ScalablepressComponent],
  imports: [
    CommonModule,
    ScalablepressRoutingModule,
    TableModule,
    ToastModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    OverlayPanelModule,
    TooltipModule,
    MessagesModule
  ]
})
export class ScalablepressModule { }
