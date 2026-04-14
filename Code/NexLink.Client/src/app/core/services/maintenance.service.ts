import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaintenanceTable } from '../models/maintenance.model';

@Injectable({ providedIn: 'root' })
export class MaintenanceService {
  private readonly apiUrl = 'api/maintenance'; // Matches your API Controller route

  constructor(private http: HttpClient) {}

  // Gets the list for the sidebar menu
  getAvailableTables(): Observable<MaintenanceTable[]> {
    return this.http.get<MaintenanceTable[]>(`${this.apiUrl}/tables`);
  }

  // Gets the actual rows for a specific table
  getTableData(tableName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data/${tableName}`);
  }
}