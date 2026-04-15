# Maintenance API Documentation

## Overview
The Maintenance API provides dynamic CRUD operations for all maintenance tables in the NexLink system. It uses a generic repository pattern with reflection to enable operations on any maintenance table without creating specific endpoints for each table.

## Base URL
```
/api/maintenance
```

## Endpoints

### 1. Get Available Maintenance Tables
**Endpoint:** `GET /api/maintenance/tables`

**Description:** Retrieves a list of all maintenance tables available in the system.

**Response:**
```json
[
  {
    "displayName": "EU Countries",
    "routeValue": "EUCountry"
  },
  {
    "displayName": "Countries",
    "routeValue": "Country"
  }
]
```

**Status Codes:**
- `200 OK` - Successfully retrieved tables
- `500 Internal Server Error` - Server error

---

### 2. Get All Records from a Table
**Endpoint:** `GET /api/maintenance/{tableName}`

**Parameters:**
- `tableName` (path) - The name of the maintenance table (e.g., "EUCountry", "Country", "Currency")

**Example:**
```
GET /api/maintenance/EUCountry
```

**Response:**
```json
[
  {
    "euCountryId": "550e8400-e29b-41d4-a716-446655440000",
    "euCountryCode": "DE",
    "euCountryName": "Germany"
  },
  {
    "euCountryId": "550e8400-e29b-41d4-a716-446655440001",
    "euCountryCode": "FR",
    "euCountryName": "France"
  }
]
```

**Status Codes:**
- `200 OK` - Successfully retrieved records
- `404 Not Found` - Table not found
- `500 Internal Server Error` - Server error

---

### 3. Get a Specific Record by ID
**Endpoint:** `GET /api/maintenance/{tableName}/{id}`

**Parameters:**
- `tableName` (path) - The name of the maintenance table
- `id` (path) - The GUID of the record to retrieve

**Example:**
```
GET /api/maintenance/EUCountry/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "euCountryId": "550e8400-e29b-41d4-a716-446655440000",
  "euCountryCode": "DE",
  "euCountryName": "Germany"
}
```

**Status Codes:**
- `200 OK` - Record found
- `404 Not Found` - Table or record not found
- `500 Internal Server Error` - Server error

---

### 4. Create a New Record
**Endpoint:** `POST /api/maintenance/{tableName}`

**Parameters:**
- `tableName` (path) - The name of the maintenance table
- Body (JSON) - The record data to create

**Example:**
```
POST /api/maintenance/EUCountry
Content-Type: application/json

{
  "euCountryCode": "IT",
  "euCountryName": "Italy"
}
```

**Response:**
```json
{
  "message": "Record created successfully"
}
```

**Status Codes:**
- `201 Created` - Record created successfully
- `400 Bad Request` - Invalid request body or missing required fields
- `404 Not Found` - Table not found
- `500 Internal Server Error` - Server error

---

### 5. Update an Existing Record
**Endpoint:** `PUT /api/maintenance/{tableName}`

**Parameters:**
- `tableName` (path) - The name of the maintenance table
- Body (JSON) - The record data to update (must include ID)

**Example:**
```
PUT /api/maintenance/EUCountry
Content-Type: application/json

{
  "euCountryId": "550e8400-e29b-41d4-a716-446655440000",
  "euCountryCode": "DE",
  "euCountryName": "Germany Updated"
}
```

**Response:**
```json
{
  "message": "Record updated successfully"
}
```

**Status Codes:**
- `200 OK` - Record updated successfully
- `400 Bad Request` - Invalid request body
- `404 Not Found` - Table not found
- `500 Internal Server Error` - Server error

---

### 6. Delete a Record
**Endpoint:** `DELETE /api/maintenance/{tableName}/{id}`

**Parameters:**
- `tableName` (path) - The name of the maintenance table
- `id` (path) - The GUID of the record to delete

**Example:**
```
DELETE /api/maintenance/EUCountry/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "message": "Record deleted successfully"
}
```

**Status Codes:**
- `200 OK` - Record deleted successfully
- `404 Not Found` - Table or record not found
- `500 Internal Server Error` - Server error

---

## Supported Maintenance Tables

The API supports all maintenance tables configured in the `TableRegistry` with `IsMaintenance = true`:

- AHECCProductMapping
- ApprovedCertifier
- CertificatePrintIndicator
- CertificateReason
- CertificateRequestStatus
- Commodity
- Consignee
- Country
- CountryCommodity
- Currency
- CustomsWeightUnit
- CutType
- DeclarationIndicator
- DominantProduct
- EUCountry
- IntendedUse
- LocationQualifier
- NatureOfCommodity
- PackType
- PackageType
- Port
- PreservationType
- ProcessType
- Product
- ProductClassification
- ProductCondition
- ProductPart
- ProductType
- ProductUseIndicator
- QualityQualifier
- Region
- RegionalOffice
- RegulatoryDocument
- RequestForExport
- RFPReason
- RFPStatus
- State
- SupplementaryCode
- TransportMode
- Treatment
- TreatmentConcentration
- TreatmentIngredient
- TreatmentType
- UnitOfMeasure
- USTerritory
- WeightUnitAlternate
- WeightUnitShort

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "message": "Description of the error",
  "error": "Additional error details (if available)"
}
```

---

## Implementation Details

### Architecture

1. **Dynamic Table Resolution**: The service uses reflection to resolve entity types from table names at runtime
2. **Generic Repository Pattern**: Uses `IGenericRepository<T>` for all data operations
3. **JSON Serialization**: Automatic conversion between JSON payloads and entity types
4. **Transaction Management**: Each operation is wrapped in a SaveChangesAsync call to ensure consistency

### Key Classes

- `MaintenanceService`: Handles all business logic for CRUD operations
- `MaintenanceController`: Exposes HTTP endpoints
- `IGenericRepository<T>`: Generic repository interface for data access
- `IMaintenanceService`: Service interface defining maintenance operations

### Configuration

The service is registered in the DI container as:
```csharp
services.AddScoped<IMaintenanceService, MaintenanceService>();
```

---

## Best Practices

1. **Table Name Case-Sensitivity**: Table names are resolved case-insensitively (e.g., "eucountry", "EUCountry", and "EUCOUNTRY" all resolve to the same table)
2. **Plural to Singular Mapping**: The resolver attempts both exact matches and singular/plural conversions
3. **ID Handling**: All records use GUID identifiers. Always include the ID when updating records
4. **Validation**: Client-side validation is recommended before sending requests
5. **Error Handling**: Always handle error responses gracefully in client applications
