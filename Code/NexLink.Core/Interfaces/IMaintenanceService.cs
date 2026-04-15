using System;
using NexLink.Core.DTOs;

namespace NexLink.Core.Interfaces
{
    public interface IMaintenanceService
    {
        Task<IEnumerable<MaintenanceTableDto>> GetAvailableTablesAsync();
        Task<IEnumerable<object>> GetTableDataAsync(string tableName);
        Task<object?> GetRecordByIdAsync(string tableName, Guid id);
        Task AddRecordAsync(string tableName, object data);
        Task UpdateRecordAsync(string tableName, object data);
        Task DeleteRecordAsync(string tableName, Guid id);
    }
}
