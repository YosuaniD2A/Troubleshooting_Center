import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrokenImagesRoutingModule } from './broken-images-routing.module';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { BrokenImagesComponent } from './broken-images.component';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { ImgDowloablePipe } from '../../pipes/img-dowloable.pipe';
//import { DateFromStringPipe } from '../../pipes/date-from-string.pipe';



@NgModule({
  declarations: [BrokenImagesComponent, ImgDowloablePipe],
  imports: [
    CommonModule,
    DividerModule,
    BrokenImagesRoutingModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    ToastModule,
    ImageModule,
    ToolbarModule,
    MessagesModule,
    FormsModule,
    

  ]
})
export class BrokenImagesModule { }
