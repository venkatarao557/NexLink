# Quick Reference Guide

## API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/maintenance/tables` | List all maintenance tables |
| GET | `/api/maintenance/{table}` | Get all records from table |
| GET | `/api/maintenance/{table}/{id}` | Get record by ID |
| POST | `/api/maintenance/{table}` | Create new record |
| PUT | `/api/maintenance/{table}` | Update record |
| DELETE | `/api/maintenance/{table}/{id}` | Delete record |

---

## EUCountry Properties

```csharp
// New naming convention (use in code)
public Guid EuCountryId { get; set; }
public string EuCountryCode { get; set; }
public string EuCountryName { get; set; }

// Database columns (same, for backward compatibility)
[Column("EUCountryID")]
[Column("EUCountryCode")]
[Column("EUCountryName")]
```

---

## C# Usage Examples

### Get All EU Countries
```csharp
var countries = await maintenanceService.GetTableDataAsync("EUCountry");
```

### Get Specific Country
```csharp
var country = await maintenanceService.GetRecordByIdAsync("EUCountry", id);
```

### Create Country
```csharp
await maintenanceService.AddRecordAsync("EUCountry", new {
    euCountryCode = "DE",
    euCountryName = "Germany"
});
```

### Update Country
```csharp
await maintenanceService.UpdateRecordAsync("EUCountry", new {
    euCountryId = id,
    euCountryCode = "DE",
    euCountryName = "Germany"
});
```

### Delete Country
```csharp
await maintenanceService.DeleteRecordAsync("EUCountry", id);
```

---

## cURL Examples

### Get All Records
```bash
curl -X GET "https://localhost:5001/api/maintenance/EUCountry"
```

### Create Record
```bash
curl -X POST "https://localhost:5001/api/maintenance/EUCountry" \
  -H "Content-Type: application/json" \
  -d '{"euCountryCode":"DE","euCountryName":"Germany"}'
```

### Update Record
```bash
curl -X PUT "https://localhost:5001/api/maintenance/EUCountry" \
  -H "Content-Type: application/json" \
  -d '{"euCountryId":"<guid>","euCountryCode":"DE","euCountryName":"Germany Updated"}'
```

### Delete Record
```bash
curl -X DELETE "https://localhost:5001/api/maintenance/EUCountry/<guid>"
```

---

## HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid input or missing fields |
| 404 | Not Found | Table or record not found |
| 500 | Server Error | Unexpected server error |

---

## Table Name Variations (All Work)

```csharp
// All of these resolve to the same table:
"EUCountry"
"eucountry"
"EuCountries"
"euCountries"
"EUCOUNTRY"
```

---

## Error Response Format

```json
{
  "message": "Description of the error",
  "error": "Additional details (if available)"
}
```

---

## Files Modified

| File | Changes |
|------|---------|
| `EUCountry.cs` | Property naming, unique index |
| `NexLinkDbContext.cs` | DbSet naming, model config |
| `IMaintenanceService.cs` | 3 new CRUD methods |
| `MaintenanceService.cs` | Full CRUD implementation |
| `MaintenanceController.cs` | 5 new API endpoints |

---

## Documentation Files

| File | Purpose |
|------|---------|
| `MAINTENANCE_API.md` | Complete API reference |
| `IMPLEMENTATION_GUIDE.md` | Developer guide with examples |
| `CHANGES_SUMMARY.md` | Detailed change log |
| `PROJECT_COMPLETION_SUMMARY.md` | Project overview |
| `QUICK_REFERENCE.md` | This file |

---

## Important Notes

1. **Database columns unchanged** - For backward compatibility
2. **Property names updated** - Follow project conventions
3. **All tables supported** - 42 maintenance tables
4. **Async/await** - All operations are asynchronous
5. **Transactions included** - SaveChangesAsync after each operation

---

## Supported Tables (42)

AHECCProductMapping, ApprovedCertifier, CertificatePrintIndicator, CertificateReason, CertificateRequestStatus, Commodity, Consignee, Country, CountryCommodity, Currency, CustomsWeightUnit, CutType, DeclarationIndicator, DominantProduct, EUCountry, IntendedUse, LocationQualifier, NatureOfCommodity, PackType, PackageType, Port, PreservationType, ProcessType, Product, ProductClassification, ProductCondition, ProductPart, ProductType, ProductUseIndicator, QualityQualifier, Region, RegionalOffice, RegulatoryDocument, RequestForExport, RFPReason, RFPStatus, State, SupplementaryCode, TransportMode, Treatment, TreatmentConcentration, TreatmentIngredient, TreatmentType, UnitOfMeasure, USTerritory, WeightUnitAlternate, WeightUnitShort

---

## Build Status

✅ **SUCCESSFUL** - All changes compile without errors

---

**Last Updated:** Project completion
**Status:** Ready for Production
