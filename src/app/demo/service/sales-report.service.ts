import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesReportService {

  baseUrl: string = 'http://localhost:3001/sales_report/';

  constructor(private http: HttpClient) { }

  getStores(): Promise<any>{
    return lastValueFrom(this.http.get<any>(`${this.baseUrl}storeList`))
  }

  getMarks(): Promise<any>{
    return lastValueFrom(this.http.get<any>(`${this.baseUrl}marksList`))
  }

  getSalesSumary(data: any): Promise<any>{
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}salesSummary`, data))
  }

  getSalesSumaryByMonths(data: any): Promise<any>{
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}salesSummaryByMonths`, data))
  }

  getSalesPeriod(data: any): Promise<any>{
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}salesPeriod`, data))
  }

  getSalesStores(data: any): Promise<any>{
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}salesStores`, data))
  }

  getSalesBrands(data: any): Promise<any>{
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}salesBrands`, data))
  }

  getSalesShutterstockSplit(data: any): Promise<any>{
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}salesShutterstock`, data))
  }

  getSalesByStore(data: any): Promise<any>{
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}salesByStore`, data))
  }

  getSalesByMark(data: any): Promise<any>{
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}salesByMark`, data))
  }

}
