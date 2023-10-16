import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { BrokedImageService } from '../../service/broked-image.service';

@Component({
    templateUrl: './broken-images.component.html',
    providers: [MessageService]
})
export class BrokenImagesComponent implements OnInit {

    design: string = '';

    imageUrl: string = '';

    order: any[] = [];

    selectedArt: any = {
        id: ''
    };

    artsList: any[] = [];

    messagesInfo: Message[] | undefined;

    constructor(
        private brokedImageService: BrokedImageService,
        private messageService: MessageService) { }

    ngOnInit() {
        this.messagesInfo = [{ severity: 'info', summary: 'Info', detail: 'No hay datos cargados' }];
    }

    async search() {
        try {
            if (this.design !== '') {
                const art = await this.brokedImageService.getImageByDesign({ design: this.design });

                if (art.data.length > 0)
                    this.artsList = art.data;
                else
                    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warning', detail: 'No art was found with this design' });

            } else {
                this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'You must specify the design to be searched' });
            }
        } catch (error) {
            this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: error.message });
        }
    }

    imgDownloable(url: string): string {
        return url.replace(/dl=0/g, 'dl=1');
    }

    async change() {
        try {
            const dataToChange = {
                id: this.selectedArt.id,
                url: this.imgDownloable(this.imageUrl)
            }
            console.log(dataToChange);
            const result = await this.brokedImageService.updateImage(dataToChange);

            if (result.data[0].affectedRows > 0) {
                this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: 'El arte se actualizo correctamente' });
                this.search();
            } else {
                this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'No se pudo realizar la actualizacion' });
            }

        } catch (error) {
            if (error.error.msg === 'ER_DUP_ENTRY')
                this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'No es posible proporcionar dos URL iguales sobre un mismo POD' });
            else
                this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: error.error });
        }
    }

    dataFromString(value: string): string {
        return value.split('T')[0];
    }

}