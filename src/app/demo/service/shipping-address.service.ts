import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingAddressService {

  baseUrl: string = 'http://localhost:3001/shipping_address/';

  constructor(private http: HttpClient) { }

  getOrderByID(id): Promise<any>{
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}getOrderById`, id))
  }

  updateShipping(data): Promise<any>{
    return lastValueFrom(this.http.patch<any>(`${this.baseUrl}updateShipping`, data))
  }
}
