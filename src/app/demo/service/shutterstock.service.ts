import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShutterstockService {

  baseUrl: string = 'http://localhost:3001/shutterstock/';

  constructor(private http: HttpClient) { }

  uploadCSV(file: File, licenseType: string): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('licenseType', licenseType); 

    return lastValueFrom(this.http.post<any>(`${this.baseUrl}upload`, formData))
  }

  saveOnly(data: any): Promise<any>{
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}saveOnlyMetadata`, data))
  }

  downloadAndSave(data: any): Promise<any>{
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}saveMetadataAndDownload`, data))
  }

}
