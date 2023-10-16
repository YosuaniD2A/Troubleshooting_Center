import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesReportsRoutingModule } from './sales-reports-routing.module';
import { SalesReportsComponent } from './sales-reports.component';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
//import { DateFromStringPipe } from '../../pipes/date-from-string.pipe';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { MultiSelectModule } from 'primeng/multiselect';



@NgModule({
  declarations: [SalesReportsComponent],
  imports: [
    CommonModule,
    SalesReportsRoutingModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    TabViewModule,
    CalendarModule,
    ChartModule,
    DropdownModule,
    ProgressSpinnerModule,
    PanelModule,
    DividerModule,
    MultiSelectModule,
    FormsModule
  ]
})
export class SalesReportsModule { }
