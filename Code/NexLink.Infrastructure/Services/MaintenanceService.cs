using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NexLink.Core.DTOs;
using NexLink.Core.Interfaces;
using NexLink.Infrastructure.Data;
using System.Reflection;

namespace NexLink.Infrastructure.Services;

public class MaintenanceService : IMaintenanceService
{
    private readonly NexLinkDbContext _nexLinkDbContext;
    private readonly IServiceProvider _serviceProvider;

    // One constructor to rule them all: Inject both dependencies here
    public MaintenanceService(NexLinkDbContext context, IServiceProvider serviceProvider)    {
        // Assign both fields so the compiler knows they aren't null
        _nexLinkDbContext = context ?? throw new ArgumentNullException(nameof(context));
        _serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
    }

    public Task AddRecordAsync(string tableName, object data)
    {
        throw new NotImplementedException();
    }

    //public async Task<IActionResult> GetAvailableTables()
    //{
    //    var tables = await _nexLinkDbContext.TableRegistry
    //        .AsNoTracking()
    //        .Where(t => t.IsMaintenance)
    //        .OrderBy(t => t.DisplayName)
    //        .Select(t => new MaintenanceTableDto
    //        {
    //            DisplayName = t.DisplayName,
    //            RouteValue = t.TableName
    //        })
    //        .ToListAsync();

    //    return Ok(tables);
    //}

    public async Task<IEnumerable<MaintenanceTableDto>> GetAvailableTablesAsync()
    {
        return await _nexLinkDbContext.TableRegistry
                .AsNoTracking()
                .Where(t => t.IsMaintenance)
                .OrderBy(t => t.DisplayName)
                .Select(t => new MaintenanceTableDto
                {
                    DisplayName = t.DisplayName,
                    RouteValue = t.TableName
                })
                .ToListAsync();
    }

    public async Task<IEnumerable<object>> GetTableDataAsync(string tableName)
    {
        // 1. Map the string name to your Entity Type
        var entityType = GetEntityType(tableName);

        // 2. Resolve the Generic Repository
        var repositoryType = typeof(IGenericRepository<>).MakeGenericType(entityType);

        // It is safer to use GetService and check for null for dynamic calls
        var repository = _serviceProvider.GetRequiredService(repositoryType);

        // 3. Call 'GetAllAsync'
        var method = repositoryType.GetMethod("GetAllAsync");
        if (method == null)
        {
            throw new InvalidOperationException($"Method GetAllAsync not found on {repositoryType.Name}");
        }

        // Using 'dynamic' here is the cleanest way to await a Task with an unknown T
        dynamic task = method.Invoke(repository, null)!;
        await task;

        // Cast the result to IEnumerable<object> so Angular can consume it as a JSON array
        return (IEnumerable<object>)task.Result;
    }

    private Type GetEntityType(string tableName)
    {
        // We use the assembly of a known entity to find others—this is safer than a string-based Load
        // I'm assuming TableRegistry is one of your core entities
        var assembly = typeof(NexLink.Core.Entities.TableRegistry).Assembly;

        var type = assembly.GetTypes()
            .Where(t => t.IsClass && t.Namespace == "NexLink.Core.Entities")
            .FirstOrDefault(t =>
                t.Name.Equals(tableName, StringComparison.OrdinalIgnoreCase) ||
                t.Name.Equals(tableName.TrimEnd('s'), StringComparison.OrdinalIgnoreCase));

        if (type == null)
        {
            throw new KeyNotFoundException($"Table entity for '{tableName}' not found.");
        }

        return type;
    }

}