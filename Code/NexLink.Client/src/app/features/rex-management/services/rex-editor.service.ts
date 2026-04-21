// nex-link/services/rex-editor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RexEditorService {
  private readonly API_BASE = '/api/rex-services';

  constructor(private http: HttpClient) {}

  // Validates the REX message against DAFF schema before submission
  validateRexData(payload: any): Observable<any> {
    return this.http.post(`${this.API_BASE}/validate`, payload).pipe(
      catchError(err => throwError(() => new Error('REX Validation Failed')))
    );
  }

  // Finalizes the REX document and pushes to NEXDOC workflow
  submitToNexdoc(documentId: string, data: any): Observable<any> {
    return this.http.put(`${this.API_BASE}/submit/${documentId}`, data);
  }
}