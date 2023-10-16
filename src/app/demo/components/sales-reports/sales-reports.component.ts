import { Component, OnInit } from '@angular/core';
import { Product } from '../../api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { MessageService } from 'primeng/api';
import { SalesReportService } from '../../service/sales-report.service';
import * as FileSaver from 'file-saver';

interface expandedRows {
    [key: string]: boolean;
}

interface DropElement {
    name: string,
    code: string
}

@Component({
    templateUrl: './sales-reports.component.html',
    providers: [MessageService]
})
export class SalesReportsComponent implements OnInit {

    loading = [false, false, false, false];

    storesItems: DropElement[] = [];

    marksItems: DropElement[] = [];

    selectedStore: DropElement = null;

    selectedMark: DropElement = null;

    stateSearch: boolean = false;

    barData: any;

    barOptions: any;

    initialDate: Date | undefined;

    finalDate: Date | undefined;

    salesSummaryGeneral: any[] = [];
    salesPeriod: any[] = [];
    salesStores: any[] = [];
    salesBrands: any[] = [];
    salesShutterstock: any[] = [];
    salesByStore: any[] = [];
    salesSummary: any[] = [];
    salesByMark: any[] = [];
    salesSummaryByMark: any[] = [];

    chartDataCurrentYear: any[] = [];
    chartDataLastYear: any[] = [];

    constructor(
        private messageService: MessageService,
        private salesReportService: SalesReportService) { }

    ngOnInit() {
        this.loadStores()
        this.loadMarks()
        this.initCharts();
    }

    async loadStores(): Promise<void> {
        const stores = await this.salesReportService.getStores();
        console.log(stores);

        stores.data.forEach((store, index) => {
            this.storesItems.push({ name: store, code: index })
        })
    }

    async loadMarks(): Promise<void> {
        const marks = await this.salesReportService.getMarks();
        console.log(marks);

        marks.data.forEach((mark, index) => {
            this.marksItems.push({ name: mark, code: index })
        })
    }

    load(index: number) {
        this.loading[index] = true;
        setTimeout(() => this.loading[index] = false, 1000);
        this.search();
    }

    async initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        await this.initChartData()

        this.barData = {
            labels: this.getMonthsSinceStartOfYear(),
            datasets: [
                {
                    label: 'Current Year',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data: this.chartDataCurrentYear.map((data) => {
                        return data.revenue
                    })
                    // data: [65, 59, 80, 81, 56, 55, 40, 0, 0, 0]
                },
                {
                    label: 'Last Year',
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    data: this.chartDataLastYear.map((data) => {
                        return data.revenue
                    })
                    // data: [28, 48, 40, 19, 86, 27, 90, 0, 0, 0]
                }
            ]
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
    }

    async initChartData(): Promise<void> {
        try {
            const today = new Date();
            const currentYear = today.getFullYear();
            const lastYear = currentYear - 1;

            const currentYearToday = this.formatDate(today);
            const lastYearToday = this.formatDate(new Date(lastYear, today.getMonth(), today.getDate()));
            const startOfCurrentYear = `${currentYear}-01-01`;
            const startOfLastYear = `${lastYear}-01-01`;

            const dataCurrent = {
                initialDate: startOfCurrentYear,
                finalDate: currentYearToday
            };

            const dataLast = {
                initialDate: startOfLastYear,
                finalDate: lastYearToday
            };

            const data1 = await this.salesReportService.getSalesSumaryByMonths(dataCurrent);
            this.chartDataCurrentYear = data1.data
            const data2 = await this.salesReportService.getSalesSumaryByMonths(dataLast);
            this.chartDataLastYear = data2.data

        } catch (error) {
            this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: error.error });
        }
    }

    async search(): Promise<void> {
        try {
            this.resetLists();
            const date1 = this.formatDate(this.initialDate);
            const date2 = this.formatDate(this.finalDate);

            if (date1 !== null && date2 !== null) {
                if ((this.selectedStore == undefined || this.selectedStore == null) && (this.selectedMark == undefined || this.selectedMark == null)) {
                    const data = {
                        initialDate: date1,
                        finalDate: date2
                    }
                    const salesSummaryGeneral = await this.salesReportService.getSalesSumary(data);
                    this.salesSummaryGeneral = salesSummaryGeneral.data;
                    const salesPeriod = await this.salesReportService.getSalesPeriod(data);
                    this.salesPeriod = salesPeriod.data;
                    const salesStores = await this.salesReportService.getSalesStores(data);
                    this.salesStores = salesStores.data;
                    const salesBrands = await this.salesReportService.getSalesBrands(data);
                    this.salesBrands = salesBrands.data;
                    const salesShutterstock = await this.salesReportService.getSalesShutterstockSplit(data);
                    this.salesShutterstock = salesShutterstock.data;

                } else {
                    if (this.selectedStore !== null && this.selectedMark !== null){
                        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Solo puede seleccionar un filtro a la vez' });
                    }else{
                        if (this.selectedStore !== null && this.selectedMark == null) {
                            const data = {
                                initialDate: date1,
                                finalDate: date2,
                                store: this.selectedStore.name
                            }
                            const sales = await this.salesReportService.getSalesByStore(data);
                            this.salesByStore = sales.data,
                                this.salesSummary.push({
                                    orders: sales.data.length,
                                    units: sales.data.reduce((total, item) => total + item.quantity, 0),
                                    revenue: sales.data.reduce((total, item) => total + item['total_sales'], 0).toFixed(2)
                                })
                        } else {
                            const data = {
                                initialDate: date1,
                                finalDate: date2,
                                mark: this.selectedMark.name
                            }
                            const sales = await this.salesReportService.getSalesByMark(data);
                            this.salesByMark = sales.data,
                                this.salesSummary.push({
                                    orders: sales.data.length,
                                    units: sales.data.reduce((total, item) => total + item.quantity, 0),
                                    revenue: sales.data.reduce((total, item) => total + item['total_sales'], 0).toFixed(2)
                                })
                        }
                    }

                }
                console.log({
                    salesSummaryGeneral: this.salesSummaryGeneral,
                    salesPeriod: this.salesPeriod,
                    salesStores: this.salesStores,
                    salesBrands: this.salesBrands,
                    salesShutterstock: this.salesShutterstock,
                    salesByStore: this.salesByStore,
                    salesSummary: this.salesSummary,
                    salesByMark: this.salesByMark,
                });

                this.stateSearch = true;

            } else {
                this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Debe seleccionar ambas fechas' });
            }
        } catch (error) {
            this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: error.error });
        }
    }

    resetLists() {
        this.salesSummaryGeneral = [];
        this.salesPeriod = [];
        this.salesStores = [];
        this.salesBrands = [];
        this.salesShutterstock = [];
        this.salesByStore = [];
        this.salesSummary = [];
        this.salesByMark = [];
    }

    formatDate(date) {
        if (date !== undefined) {

            const year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (month < 10) {
                month = `0${month}`;
            }
            if (day < 10) {
                day = `0${day}`;
            }

            return `${year}-${month}-${day}`;
        } else {
            return null;
        }
    }

    getMonthsSinceStartOfYear(): string[] {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        const months = [];

        for (let year = 2023; year <= currentYear; year++) {
            const startMonth = (year === 2023) ? 0 : 1;
            const endMonth = (year === currentYear) ? currentMonth : 11;

            for (let month = startMonth; month <= endMonth; month++) {
                const date = new Date(year, month, 1);
                months.push(date.toLocaleString('en-US', { month: 'long' }));
            }
        }

        return months;
    }

    exportCSV() {
        try {
            const tables = [
                { SummaryGeneral: this.salesSummaryGeneral },
                { Period: this.salesPeriod },
                { Platforms: this.salesStores },
                { Brands: this.salesBrands },
                { Shutterstock: this.salesShutterstock },
                { Summary: this.salesSummary },
                { Store: this.salesByStore },
                { Mark: this.salesByMark }
            ];

            import('xlsx').then((xlsx) => {
                const workbook = { Sheets: {}, SheetNames: [] };
                const headerStyle = {
                    font: { bold: true, color: { rgb: 'FFFFFF' } },
                    fill: { fgColor: { rgb: '000000' } }
                };

                tables.forEach((tableObject) => {
                    const propertyName = Object.keys(tableObject)[0];
                    const table = tableObject[propertyName];

                    if (table.length !== 0) {
                        const salesSheet = xlsx.utils.json_to_sheet(table);

                        const wscols = [
                            { wch: 15 },
                            { wch: 10 },
                            { wch: 7 }
                        ];
                        salesSheet['!cols'] = wscols;

                        for (let col = 0; col < wscols.length; col++) {
                            const cellRef = xlsx.utils.encode_cell({ c: col, r: 0 });
                            salesSheet[cellRef].s = headerStyle;
                        }

                        xlsx.utils.book_append_sheet(workbook, salesSheet, propertyName);
                    }
                });

                const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
                this.saveAsExcelFile(excelBuffer, 'Sales Report - ');
            });

        } catch (error) {
            this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'A ocurrido un error, asegurse de haber cargado datos en las tablas' });
        }
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        if(this.selectedStore == null && this.selectedMark == null){
            FileSaver.saveAs(data, fileName + this.formatDate(this.initialDate) + ' to ' + this.formatDate(this.finalDate) + EXCEL_EXTENSION);
        }else{
            if(this.selectedStore !== null){
                FileSaver.saveAs(data, fileName + this.formatDate(this.initialDate) + ' to ' + this.formatDate(this.finalDate) + ' (' + this.selectedStore.name.toUpperCase() + ')' + EXCEL_EXTENSION);
            }else{
                FileSaver.saveAs(data, fileName + this.formatDate(this.initialDate) + ' to ' + this.formatDate(this.finalDate) + ' (' + this.selectedMark.name.toUpperCase() + ')' + EXCEL_EXTENSION);
            }
        }
    }

    dataFromString(value: string): string {
        return value.split('T')[0];
      }

}