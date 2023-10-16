import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScalablepressService {

  baseUrl: string = 'http://localhost:3001/scalablepress/';

  constructor(private http: HttpClient) { }

  getOrdersWithoutSP_Id(): Promise<any>{
    return lastValueFrom(this.http.get<any>(`${this.baseUrl}getOrdersWithoutSP_Id`))
  }

  getSizes(): Promise<any>{
    return lastValueFrom(this.http.get<any>(`${this.baseUrl}getSizes`))
  }

  getSuggestions(sku): Promise<any>{
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}getSuggestions`, sku))
  }

  insertDictionary(data): Promise<any>{
    return lastValueFrom(this.http.put<any>(`${this.baseUrl}insertDictionary`, data))
  }

  deleteOrder(id): Promise<any>{  
    return lastValueFrom(this.http.delete<any>(`${this.baseUrl}deleteOrder/${id}`))

  }

}
