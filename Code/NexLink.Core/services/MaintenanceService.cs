using Microsoft.Extensions.DependencyInjection;
using NexLink.Core.Entities; // Your namespace for Country, Port, etc.
using NexLink.Core.Interfaces;
using System.Reflection;

namespace NexLink.Infrastructure.Services;

public class MaintenanceService : IMaintenanceService
{
    private readonly IServiceProvider _serviceProvider;

    public MaintenanceService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public Task AddRecordAsync(string tableName, object data)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<object>> GetTableDataAsync(string tableName)
    {
        // 1. Map the string name to your Entity Type
        var entityType = GetEntityType(tableName);

        // 2. Dynamically resolve IGenericRepository<T> from the DI container
        var repositoryType = typeof(IGenericRepository<>).MakeGenericType(entityType);
        var repository = _serviceProvider.GetRequiredService(repositoryType);

        // 3. Call 'GetAllAsync' using reflection
        var method = repositoryType.GetMethod("GetAllAsync");
        var task = (Task)method!.Invoke(repository, null)!;

        await task.ConfigureAwait(false);

        // Return the Result property of the Task
        return (IEnumerable<object>)((dynamic)task).Result;
    }

    private Type GetEntityType(string tableName)
    {
        // 1. Load the specific NexLink Core assembly
        // This ensures we are looking exactly where the entities live
        var assembly = Assembly.Load("NexLink.Core");

        // 2. Search for the class within the Entities namespace
        // We use StringComparison.OrdinalIgnoreCase to handle 'Country' vs 'country'
        var type = assembly.GetTypes()
            .Where(t => t.IsClass && t.Namespace == "NexLink.Core.Entities")
            .FirstOrDefault(t =>
                t.Name.Equals(tableName, StringComparison.OrdinalIgnoreCase) ||
                // Handles case where URL is 'Countries' but class is 'Country'
                t.Name.Equals(tableName.TrimEnd('s'), StringComparison.OrdinalIgnoreCase)
            );

        if (type == null)
        {
            throw new ArgumentException($"Table '{tableName}' not found in NexLink.Core.Entities.");
        }

        return type;
    }

}