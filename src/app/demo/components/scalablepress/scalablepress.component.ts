import { Component, OnInit } from '@angular/core';
import { MessageService, Message } from 'primeng/api';
import { ScalablepressService } from '../../service/scalablepress.service';

@Component({
    templateUrl: './scalablepress.component.html',
    providers: [MessageService]
})
export class ScalablepressComponent implements OnInit {


    products: any[] = [{
        "id": "1003",
        "code": "244wgerg",
        "name": "Blue Shirt",
        "description": "Product Description",
        "image": "blue-t-shirt.jpg",
        "price": 29,
        "category": "Clothing",
        "quantity": 25,
        "inventoryStatus": "INSTOCK",
        "rating": 5,
        "orders": []
    }];

    orders: any[] = [];
    suggestions: any[] = [];
    sizeList: any[] = [];
    sizeTranslation = ['00L', '00S', 'S', 'L'];

    selectedOrder: any = {};
    selectedSize: string = '';
    selectedSizeTrans: string = '';
    designId: string = '';

    messagesInfo: Message[] | undefined;


    constructor(
        private scalablepressService: ScalablepressService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.loadData();

        this.messagesInfo = [{ severity: 'success', summary: 'Success', detail: 'No se identificaron ordenes sin Scalablepress ID' }];
    }

    async loadData() {
        try {
            const data = await this.scalablepressService.getOrdersWithoutSP_Id();
            this.orders = data.data;

            if (this.orders.length !== 0) {
                if (this.orders.length > 1) {
                    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Se han identificado varias ordenes sin Scalable press ID' });
                } else {
                    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warning', detail: 'Se ha identificado una orden sin Scalable press ID' });
                }
            }

            const sizes = await this.scalablepressService.getSizes();
            sizes.data.forEach(elem => {
                this.sizeList.push(elem.size)
            });

        } catch (error) {

        }
    }

    async seeSuggestions() {
        try {
            console.log(this.selectedOrder.sku);
            const data = await this.scalablepressService.getSuggestions({ sku: this.selectedOrder.sku });
            this.suggestions = data.data;

            console.log(this.suggestions);

        } catch (error) {

        }
    }

    async insertDesidnId() {
        try {
            const data = {
                date: this.formatDate(new Date()),
                sku: this.selectedOrder.sku,
                size: this.selectedSize,
                size_translation: this.selectedSizeTrans,
                design_id: this.designId
            };
            const result = await this.scalablepressService.insertDictionary(data);
            if (result.data.affectedRows === 1) {
                this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: 'El Design ID se registro satisfactoriamente' });

                console.log(this.selectedOrder.id);
                this.deleteOrder(this.selectedOrder.id)
                
                

            } else {
                this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'No se pudo realizar el registro' });
            }
        } catch (error) {
            this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: error.error });
        }
    }

    async deleteOrder(id){
        try {
            const deletedResult = await this.scalablepressService.deleteOrder(id);
            this.loadData()
            console.log(deletedResult);
        } catch (error) {
            this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: error.error });
        }
    }

    disabled(): boolean {
        if (!this.selectedOrder.sku || this.selectedSize === '' || this.selectedSizeTrans === '' || this.designId === '') {
            return true;
        } else {
            return false;
        }
    }

    formatDate(today: Date): string {
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

}