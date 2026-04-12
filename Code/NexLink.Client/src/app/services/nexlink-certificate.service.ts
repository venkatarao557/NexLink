import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private readonly baseUrl = `${environment.apiUrl}/certificates`;

  constructor(private http: HttpClient) {}

  // Retrieves status from the NEXDOC interfacing system
  getCertificateStatus(rfpId: string) {
    return this.http.get(`${this.baseUrl}/rfp/${rfpId}/status`);
  }

  // Downloads the generated eCert as a PDF blob
  downloadCertificate(rfpId: string) {
    return this.http.get(`${this.baseUrl}/rfp/${rfpId}/download`, {
      responseType: 'blob'
    });
  }
}