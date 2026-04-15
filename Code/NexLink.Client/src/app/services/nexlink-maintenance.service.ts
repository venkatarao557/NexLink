import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Represents a metadata object for NexLink management tables
 */
export interface MaintenanceTable {
  displayName: string; // The human-readable name (e.g., "Country")
  routeValue: string;  // The string used for API calls (e.g., "Country")
}


@Injectable({
  providedIn: 'root' // Option 1: Global singleton injection
})
export class MaintenanceService {
  private readonly baseUrl = `${environment.apiUrl}/maintenance`;

  constructor(private http: HttpClient) { }

  /**
   * Fetches the list of all available management tables from the NexLink.Core assembly.
   * This prevents having to hardcode 45+ table names in Angular.
   */
  getAvailableTables(): Observable<MaintenanceTable[]> {
    return this.http.get<MaintenanceTable[]>(`${this.baseUrl}/tables`);
  }

  /**
   * Dynamically fetches records from any NexLink table.
   * @param tableName Name of the SQL table (e.g., 'Ports', 'CommodityTypes')
   */
  getTableData(tableName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${tableName}`);
  }

  private readonly jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  // Generic method to create a new record for a table
  createRecord(tableName: string, data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${tableName}`,
      JSON.stringify(data),
      { headers: this.jsonHeaders }
    );
  }

  // Generic method to update any reference data table
  updateRecord(tableName: string, id: string, data: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${tableName}/${id}`,
      JSON.stringify(data),
      { headers: this.jsonHeaders }
    );
  }

  // Generic method to delete a record from a table
  deleteRecord(tableName: string, id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${tableName}/${id}`);
  }
}

