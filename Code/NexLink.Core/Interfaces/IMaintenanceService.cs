using System;
using System.Collections.Generic;
using System.Text;

namespace NexLink.Core.Interfaces
{
    public interface IMaintenanceService
    {
        Task AddRecordAsync(string tableName, object data);
        Task<IEnumerable<dynamic>> GetTableDataAsync(string tableName);
    }
}
