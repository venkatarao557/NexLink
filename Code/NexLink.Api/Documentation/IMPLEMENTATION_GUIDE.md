# Implementation Guide - Maintenance CRUD System

## Quick Start

### 1. Register the Service (already done in Startup/Program.cs)
```csharp
services.AddScoped<IMaintenanceService, MaintenanceService>();
services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
```

### 2. Basic Usage Examples

#### Get All Records
```csharp
var allCountries = await _maintenanceService.GetTableDataAsync("Country");
```

#### Get Single Record
```csharp
var record = await _maintenanceService.GetRecordByIdAsync("EUCountry", new Guid("550e8400-e29b-41d4-a716-446655440000"));
```

#### Create Record
```csharp
var newRecord = new 
{ 
    euCountryCode = "NL",
    euCountryName = "Netherlands"
};
await _maintenanceService.AddRecordAsync("EUCountry", newRecord);
```

#### Update Record
```csharp
var updatedRecord = new 
{ 
    euCountryId = new Guid("550e8400-e29b-41d4-a716-446655440000"),
    euCountryCode = "NL",
    euCountryName = "Netherlands (Updated)"
};
await _maintenanceService.UpdateRecordAsync("EUCountry", updatedRecord);
```

#### Delete Record
```csharp
await _maintenanceService.DeleteRecordAsync("EUCountry", new Guid("550e8400-e29b-41d4-a716-446655440000"));
```

---

## API Usage Examples

### Using cURL

#### Get all tables
```bash
curl -X GET "https://localhost:5001/api/maintenance/tables"
```

#### Get all EU Countries
```bash
curl -X GET "https://localhost:5001/api/maintenance/EUCountry"
```

#### Get specific EU Country
```bash
curl -X GET "https://localhost:5001/api/maintenance/EUCountry/550e8400-e29b-41d4-a716-446655440000"
```

#### Create new EU Country
```bash
curl -X POST "https://localhost:5001/api/maintenance/EUCountry" \
  -H "Content-Type: application/json" \
  -d '{
    "euCountryCode": "BE",
    "euCountryName": "Belgium"
  }'
```

#### Update EU Country
```bash
curl -X PUT "https://localhost:5001/api/maintenance/EUCountry" \
  -H "Content-Type: application/json" \
  -d '{
    "euCountryId": "550e8400-e29b-41d4-a716-446655440000",
    "euCountryCode": "BE",
    "euCountryName": "Belgium (Updated)"
  }'
```

#### Delete EU Country
```bash
curl -X DELETE "https://localhost:5001/api/maintenance/EUCountry/550e8400-e29b-41d4-a716-446655440000"
```

### Using Postman

1. **Create a new collection** for Maintenance API
2. **Set base URL:** `https://localhost:5001/api/maintenance`
3. **Create requests for each endpoint:**

**GET - Get All Tables**
- Method: GET
- URL: `{{base_url}}/tables`

**GET - Get All Records**
- Method: GET
- URL: `{{base_url}}/EUCountry`

**GET - Get Record by ID**
- Method: GET
- URL: `{{base_url}}/EUCountry/{{recordId}}`

**POST - Create Record**
- Method: POST
- URL: `{{base_url}}/EUCountry`
- Body (raw JSON):
```json
{
  "euCountryCode": "ES",
  "euCountryName": "Spain"
}
```

**PUT - Update Record**
- Method: PUT
- URL: `{{base_url}}/EUCountry`
- Body (raw JSON):
```json
{
  "euCountryId": "550e8400-e29b-41d4-a716-446655440000",
  "euCountryCode": "ES",
  "euCountryName": "Spain (Updated)"
}
```

**DELETE - Delete Record**
- Method: DELETE
- URL: `{{base_url}}/EUCountry/550e8400-e29b-41d4-a716-446655440000`

---

## Angular Integration Example

### Service Wrapper
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = '/api/maintenance';

  constructor(private http: HttpClient) { }

  getAvailableTables(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tables`);
  }

  getAllRecords(tableName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${tableName}`);
  }

  getRecordById(tableName: string, id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${tableName}/${id}`);
  }

  createRecord(tableName: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${tableName}`, data);
  }

  updateRecord(tableName: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${tableName}`, data);
  }

  deleteRecord(tableName: string, id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${tableName}/${id}`);
  }
}
```

### Component Usage
```typescript
import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from './services/maintenance.service';

@Component({
  selector: 'app-eu-country-manager',
  templateUrl: './eu-country-manager.component.html'
})
export class EUCountryManagerComponent implements OnInit {
  countries: any[] = [];
  selectedCountry: any = null;

  constructor(private maintenanceService: MaintenanceService) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.maintenanceService.getAllRecords('EUCountry')
      .subscribe(
        data => this.countries = data,
        error => console.error('Error loading countries', error)
      );
  }

  addCountry(countryData: any): void {
    this.maintenanceService.createRecord('EUCountry', countryData)
      .subscribe(
        () => this.loadCountries(),
        error => console.error('Error adding country', error)
      );
  }

  updateCountry(countryData: any): void {
    this.maintenanceService.updateRecord('EUCountry', countryData)
      .subscribe(
        () => this.loadCountries(),
        error => console.error('Error updating country', error)
      );
  }

  deleteCountry(id: string): void {
    if (confirm('Are you sure you want to delete this country?')) {
      this.maintenanceService.deleteRecord('EUCountry', id)
        .subscribe(
          () => this.loadCountries(),
          error => console.error('Error deleting country', error)
        );
    }
  }
}
```

---

## Error Handling Best Practices

### Server-Side (C#)
```csharp
try
{
    await _maintenanceService.UpdateRecordAsync(tableName, data);
    return Ok(new { message = "Record updated successfully" });
}
catch (KeyNotFoundException ex)
{
    return NotFound(new { message = ex.Message });
}
catch (ArgumentNullException ex)
{
    return BadRequest(new { message = ex.Message });
}
catch (Exception ex)
{
    return StatusCode(500, new { message = "An error occurred", error = ex.Message });
}
```

### Client-Side (Angular)
```typescript
createRecord(tableName: string, data: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/${tableName}`, data)
    .pipe(
      catchError(error => {
        this.handleError(error);
        return throwError(() => new Error('Operation failed'));
      })
    );
}

private handleError(error: any): void {
  const errorMessage = error?.error?.message || error?.message || 'An unknown error occurred';
  console.error('API Error:', errorMessage);
  // Show user-friendly error message
}
```

---

## Important Notes

### 1. Property Naming
- Database columns remain unchanged (e.g., `EUCountryID`)
- Entity properties follow PascalCase convention (e.g., `EuCountryId`)
- Always use the entity property names in your code and API payloads

### 2. ID Management
- All maintenance tables use GUID (Guid) as primary keys
- Generate new GUIDs for new records or let the database generate them
- Always include the ID when updating records

### 3. Table Name Resolution
- Table names are case-insensitive in API calls
- Both singular and plural forms are supported
- Examples: "EUCountry", "eucountry", "EuCountries" all resolve to the same table

### 4. JSON Serialization
- Properties must match entity property names (case-sensitive in JSON)
- Use camelCase or match the entity property naming convention
- The system automatically handles JSON-to-entity conversion

### 5. Transactions
- Each CRUD operation is wrapped in a transaction
- SaveChangesAsync() is called after each operation
- Use client-side transactions for multi-table operations

---

## Performance Considerations

1. **Caching**: Consider caching stable reference data like EU Countries
2. **Pagination**: For large datasets, implement pagination in the service
3. **Indexing**: Unique fields (like Country Code) are indexed for better performance
4. **Filtering**: Implement server-side filtering for large result sets
5. **Lazy Loading**: Consider loading related entities as needed

---

## Security Recommendations

1. **Authentication**: Ensure all endpoints require authentication
2. **Authorization**: Implement role-based access control for maintenance operations
3. **Input Validation**: Always validate and sanitize user input
4. **SQL Injection Prevention**: The service uses Entity Framework which prevents SQL injection
5. **Sensitive Data**: Be cautious with sensitive fields in maintenance tables
6. **Audit Trail**: Consider logging all maintenance operations for compliance

---

## Troubleshooting

### Issue: "Table entity for 'TableName' not found"
- **Cause**: Table name doesn't match any entity class
- **Solution**: Verify the table name is correct and the entity exists in `NexLink.Core.Entities`

### Issue: "Record with ID not found"
- **Cause**: The GUID doesn't exist in the database
- **Solution**: Verify the ID is correct before making the request

### Issue: "Failed to deserialize data"
- **Cause**: JSON payload doesn't match entity structure
- **Solution**: Check property names and types match the entity definition

### Issue: 500 Internal Server Error
- **Cause**: Various server-side errors
- **Solution**: Check server logs for detailed error information

---

## Support & Questions

For questions or issues, refer to:
- MAINTENANCE_API.md - Full API documentation
- CHANGES_SUMMARY.md - Summary of all changes
- IMaintenanceService.cs - Service interface definition
- MaintenanceController.cs - Controller implementation
