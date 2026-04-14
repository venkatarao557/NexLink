using System;
using Microsoft.AspNetCore.Mvc;
using NexLink.Core.DTOs;


namespace NexLink.Core.Interfaces
{
    public interface IMaintenanceService
    {
        Task AddRecordAsync(string tableName, object data);
        Task<IEnumerable<dynamic>> GetTableDataAsync(string tableName);
        //Task<IActionResult> GetAvailableTables();

        Task<IEnumerable<MaintenanceTableDto>> GetAvailableTablesAsync();
    }
}
