import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CountryService } from '../../service/country.service';
import { ShippingAddressService } from '../../service/shipping-address.service';

interface Column {
    field: string;
    header: string;
}

@Component({
    templateUrl: './shipping-address.component.html',
    providers: [MessageService]
})
export class ShippingAddressComponent implements OnInit {

    loading = [false, false, false, false];

    site_order_id: string = '';

    orders: any[] = [];

    selectedOrder: any = {
        street_1: '',
        shipping_city: '',
        shipping_country: '',
        shipping_state_province: '',
        shipping_postal_code: ''
    };

    cols!: Column[];

    _selectedColumns!: Column[];

    countries: any[] = [];

    selectedCountry: any = null;

    selectedCity: any = null;

    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];

    constructor(
        private countryService: CountryService,
        private shippingAddresService: ShippingAddressService,
        private messageService: MessageService) { }

    ngOnInit() {
        this.cols = [
            { field: 'order_id', header: 'Order ID' },
            { field: 'site_name', header: 'Site name' },
            { field: 'sku', header: 'SKU' },
            { field: 'order_date', header: 'Date' },
            { field: 'street_2', header: 'Street 2' },
            { field: 'street_1', header: 'Street 1' },
            { field: 'shipping_city', header: 'Shipping city' },
            { field: 'shipping_postal_code', header: 'Shipping postal code' },
            { field: 'shipping_state_province', header: 'Shipping state/province' },
            { field: 'shipping_country', header: 'Shipping country' },
            { field: 'tracking_number', header: 'Tracking number' }
        ];

        this._selectedColumns = this.cols;

        this.countryService.getCountries().then(countries => {
            this.countries = countries.map(country => {
                return {
                    country: `${country.name} - ${country.code}`
                };
            });
        });
    }

    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }

    set selectedColumns(val: any[]) {
        this._selectedColumns = this.cols.filter((col) => val.includes(col));
    }

    load(index: number) {
        this.loading[index] = true;
        setTimeout(() => this.loading[index] = false, 1000);
        this.search();
    }

    async search() {
        try {
            if (this.site_order_id !== '') {
                const result = await this.shippingAddresService.getOrderByID({ id: this.site_order_id });
                if(result.data.length > 0)
                    this.orders = result.data;
                else
                this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'No se encontro ninguna orden con este Site order ID' });

            } else {
                this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Debe introducir un Site order ID, valido' });
            }
        } catch (error) {
            this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: error.message });
        }
    }

    async change() {
        try {
            if (!this.selectedOrder.id) {
                this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'No se ha selecionado nada' });
            } else {
                const dataToChange = {
                    street: this.selectedOrder.street_1,
                    shipping_city: this.selectedOrder.shipping_city,
                    shipping_country: this.selectedCountry.country.split(' - ')[1],
                    shipping_state_province: this.selectedOrder.shipping_state_province,
                    shipping_postal_code: this.selectedOrder.shipping_postal_code,
                    id: this.selectedOrder.id
                };

                const response = await this.shippingAddresService.updateShipping(dataToChange);
                
                if (response.data.affectedRows > 0)
                    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: 'Se establecieron los cambios correctamente' });
                else
                    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'No se pudieron establecer los cambios, intente mas tarde' });

                if(this.orders.length > 1)
                    this.search();
                else
                this.selectedOrder = {
                    street_1: '',
                    shipping_city: '',
                    shipping_country: '',
                    shipping_state_province: '',
                    shipping_postal_code: ''
                };
                    // location.reload();
            }
        } catch (error) {
            this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: error.message });
        }
    }

}