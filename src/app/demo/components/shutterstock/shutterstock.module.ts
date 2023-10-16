import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShutterstockRoutingModule } from './shutterstock-routing.module';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ShutterstockComponent } from './shutterstock.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitPipe } from '../../pipes/split.pipe';



@NgModule({
  declarations: [ShutterstockComponent, SplitPipe],
  imports: [
    CommonModule,
    ShutterstockRoutingModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    SplitButtonModule,
  ]
})
export class ShutterstockModule { }
