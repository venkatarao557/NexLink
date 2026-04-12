import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RexService {
  private readonly baseUrl = `${environment.apiUrl}/rex`;

  constructor(private http: HttpClient) {}

  // Fetches exporter profile details for statement of origin
  getExporterProfile(rexNumber: string) {
    return this.http.get(`${this.baseUrl}/exporter/${rexNumber}`);
  }

  // Validates a REX statement against DAFF requirements
  validateStatement(payload: any) {
    return this.http.post(`${this.baseUrl}/validate`, payload);
  }
}