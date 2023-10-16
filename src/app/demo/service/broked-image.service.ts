import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrokedImageService {

  baseUrl: string = 'http://localhost:3001/broked_image/';

  constructor(private http: HttpClient) { }

  getImageByDesign(design): Promise<any>{
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}getImagenByDesign`, design))
  }

  updateImage(data): Promise<any>{
    return lastValueFrom(this.http.patch<any>(`${this.baseUrl}updateImage`, data))
  }
}
