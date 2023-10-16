import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../api/product';
import { Table } from 'primeng/table';
import { MessageService, MenuItem, Message } from 'primeng/api';
import { ShutterstockService } from '../../service/shutterstock.service';
import { FileUpload } from 'primeng/fileupload';
import { imageMetadata } from '../../interfaces/imageMetadata.interface';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    templateUrl: './shutterstock.component.html',
    providers: [MessageService]
})
export class ShutterstockComponent implements OnInit {

    @ViewChild('uploader') uploader: FileUpload;

    items: MenuItem[] = [];

    // productDialog: boolean = false;

    // deleteProductDialog: boolean = false;

    // deleteProductsDialog: boolean = false;

    // selectedProducts: Product[] = [];

    // submitted: boolean = false;

    messagesInfo: Message[] | undefined;
    messagesWarn: Message[] | undefined;
    messagesError: Message[] | undefined;

    imageList: imageMetadata[] = [];

    imagesWithErrors: any[] = [];

    products: Product[] = [];

    product: Product = {};

    dropdownItems: any[] = [];

    cols: any[] = [];

    statuses: any[] = [];

    selectedLicenseType: any = {};

    selectedFile: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    downloable: boolean = false;

    constructor(
        private messageService: MessageService,
        private shutterstockService: ShutterstockService) { }

    ngOnInit() {

        this.messagesInfo = [{ severity: 'info', summary: 'Info', detail: 'No hay datos cargados' }];
        this.messagesWarn = [{ severity: 'warn', summary: 'Warning', detail: `Se han detectado varios elementos con problemas` }];
        this.messagesError = [{ severity: 'error', summary: 'Error', detail: 'Los datos cargados son erroneos' }];

        this.dropdownItems = [
            { name: 'Commercial', code: 'Option 1' },
            { name: 'Editorial', code: 'Option 2' }
        ];

        this.cols = [
            { field: 'shutterstock_id', header: 'Image ID' },
            { field: 'description', header: 'Description' },
            { field: 'categories', header: 'Categories' },
            { field: 'keywords', header: 'Keywords' },
            { field: 'displayname', header: 'Displayname' },
            { field: 'is_licensable', header: 'Licensable' },
            { field: 'filename', header: 'Filename' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

        this.items = [
            {
                label: 'Save only', icon: 'pi pi-save', command: () => {
                    this.save();
                }
            },
            {
                label: 'Save & Download', icon: 'pi pi-download', command: () => {
                    this.download();
                }
            },
            {
                label: 'Download erroneous item', icon: 'pi pi-file-excel', command: () => {
                    this.exportToCSV();
                }
            }
        ];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async onFileSelected(event: any) {
        try {
            this.selectedFile = true
            const file = event.currentFiles[0];
            const response = await this.shutterstockService.uploadCSV(file, this.selectedLicenseType.name);

            this.imageList = response.data.filter((image) => {
                return image !== null
            })

            this.imagesWithErrors = response.listErrorsIDs

            console.log(response)
            if (this.imageList.length > 0) {
                this.downloable = true;
                this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: 'Archivo cargado satisfactoriamente' });
            }
        } catch (error) {
            this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: error.message });
        }
    }

    cleanUploader() {
        this.uploader.clear();
        this.selectedFile = false;
        this.imageList = [];
        this.imagesWithErrors = [];
    }

    async save() {
        try {
            const data = {
                licenseType: this.selectedLicenseType.name,
                data: this.imageList
            }
            const response = await this.shutterstockService.saveOnly(data);
            const result = this.countSubstrings(response.data, 'existe')

            if (result.exists > 0) {
                this.messageService.add({ key: 'bc', severity: 'warn', summary: 'Warning', detail: `Se identificaron ${result.exists} existentes y ${result.satisfactory} se guardaron correctamente` });
            } else {
                this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Se guardaron todos los archivos en la Base de datos' });
            }

        } catch (error) {
            this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: 'Ocurrio algun tipo de error' });
        }
    }

    async download() {
        try {
            const data = {
                licenseType: this.selectedLicenseType.name,
                data: this.imageList
            }
            const response = await this.shutterstockService.downloadAndSave(data);
            const result = this.countSubstrings(response.result, 'existe')

            if (result.exists > 0) {
                this.messageService.add({ key: 'bc', severity: 'warn', summary: 'Warning', detail: `Se identificaron ${result.exists} existentes y ${result.satisfactory} se descargaron correctamente` });
            } else {
                this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Se descargaron todos los archivos' });
            }
        } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio algun tipo de error' });
        }
    }

    // downloadErroneous() {
    //     this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Data Deleted' });
    // }

    countSubstrings(stringList, text) {
        let countExists = 0;
        let countSatisfactory = 0;

        stringList.forEach(string => {
            if (string.includes(text)) {
                countExists++;
            } else {
                countSatisfactory++;
            }
        });

        return {
            exists: countExists,
            satisfactory: countSatisfactory
        };
    }

    exportToCSV() {
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'id\n';
        this.imagesWithErrors.forEach(item => {
          csvContent += `${item.id}\n`;
        });
        const encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
      }
}