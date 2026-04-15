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

    public MaintenanceService(NexLinkDbContext context, IServiceProvider serviceProvider)
    {
        _nexLinkDbContext = context ?? throw new ArgumentNullException(nameof(context));
        _serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
    }

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
        var entityType = GetEntityType(tableName);
        var repositoryType = typeof(IGenericRepository<>).MakeGenericType(entityType);
        var repository = _serviceProvider.GetRequiredService(repositoryType);

        var method = repositoryType.GetMethod("GetAllAsync");
        if (method == null)
            throw new InvalidOperationException($"Method GetAllAsync not found on {repositoryType.Name}");

        dynamic task = method.Invoke(repository, null)!;
        await task;

        return (IEnumerable<object>)task.Result;
    }

    public async Task<object?> GetRecordByIdAsync(string tableName, Guid id)
    {
        var entityType = GetEntityType(tableName);
        var repositoryType = typeof(IGenericRepository<>).MakeGenericType(entityType);
        var repository = _serviceProvider.GetRequiredService(repositoryType);

        var method = repositoryType.GetMethod("GetByIdAsync");
        if (method == null)
            throw new InvalidOperationException($"Method GetByIdAsync not found on {repositoryType.Name}");

        dynamic task = method.Invoke(repository, new object[] { id })!;
        await task;

        return task.Result;
    }

    public async Task AddRecordAsync(string tableName, object data)
    {
        if (data == null)
            throw new ArgumentNullException(nameof(data));

        var entityType = GetEntityType(tableName);
        var repositoryType = typeof(IGenericRepository<>).MakeGenericType(entityType);
        var repository = _serviceProvider.GetRequiredService(repositoryType);

        var entity = ConvertToEntity(data, entityType);

        var method = repositoryType.GetMethod("AddAsync");
        if (method == null)
            throw new InvalidOperationException($"Method AddAsync not found on {repositoryType.Name}");

        dynamic task = method.Invoke(repository, new[] { entity })!;
        await task;

        await _nexLinkDbContext.SaveChangesAsync();
    }

    public async Task UpdateRecordAsync(string tableName, Guid id, object data)
    {
        if (data == null)
            throw new ArgumentNullException(nameof(data));

        var entityType = GetEntityType(tableName);
        var repositoryType = typeof(IGenericRepository<>).MakeGenericType(entityType);
        var repository = _serviceProvider.GetRequiredService(repositoryType);

        // Fetch the existing record from the database first
        var getByIdMethod = repositoryType.GetMethod("GetByIdAsync");
        if (getByIdMethod == null)
            throw new InvalidOperationException($"Method GetByIdAsync not found on {repositoryType.Name}");

        dynamic getByIdTask = getByIdMethod.Invoke(repository, new object[] { id })!;
        await getByIdTask;
        var existingEntity = getByIdTask.Result;

        if (existingEntity == null)
            throw new KeyNotFoundException($"Record with ID {id} not found in {tableName}");

        // Convert incoming JSON data to entity
        var incomingEntity = ConvertToEntity(data, entityType);

        // Copy all properties from incoming entity to existing entity except the ID
        // Only copy non-null values to avoid overwriting existing data with nulls
        var properties = entityType.GetProperties();
        var idProperty = properties.FirstOrDefault(p => p.Name.EndsWith("Id", StringComparison.OrdinalIgnoreCase));

        foreach (var property in properties)
        {
            // Skip primary key properties
            if (idProperty != null && property.Name == idProperty.Name)
                continue;

            if (property.CanWrite && property.CanRead)
            {
                var value = property.GetValue(incomingEntity);
                // Only copy non-null values to preserve existing data for properties not provided in the request
                if (value != null)
                {
                    property.SetValue(existingEntity, value);
                }
            }
        }

        var method = repositoryType.GetMethod("UpdateAsync");
        if (method == null)
            throw new InvalidOperationException($"Method UpdateAsync not found on {repositoryType.Name}");

        dynamic task = method.Invoke(repository, new[] { existingEntity })!;
        await task;

        await _nexLinkDbContext.SaveChangesAsync();
    }

    public async Task DeleteRecordAsync(string tableName, Guid id)
    {
        var entityType = GetEntityType(tableName);
        var repositoryType = typeof(IGenericRepository<>).MakeGenericType(entityType);
        var repository = _serviceProvider.GetRequiredService(repositoryType);

        var method = repositoryType.GetMethod("DeleteAsync");
        if (method == null)
            throw new InvalidOperationException($"Method DeleteAsync not found on {repositoryType.Name}");

        dynamic task = method.Invoke(repository, new object[] { id })!;
        await task;

        await _nexLinkDbContext.SaveChangesAsync();
    }

    private Type GetEntityType(string tableName)
    {
        var assembly = typeof(NexLink.Core.Entities.TableRegistry).Assembly;

        var type = assembly.GetTypes()
            .Where(t => t.IsClass && t.Namespace == "NexLink.Core.Entities")
            .FirstOrDefault(t =>
                t.Name.Equals(tableName, StringComparison.OrdinalIgnoreCase) ||
                t.Name.Equals(tableName.TrimEnd('s'), StringComparison.OrdinalIgnoreCase));

        if (type == null)
            throw new KeyNotFoundException($"Table entity for '{tableName}' not found.");

        return type;
    }

    private object ConvertToEntity(object data, Type entityType)
    {
        if (data.GetType() == entityType)
            return data;

        System.Text.Json.JsonElement jsonElement;

        if (data is System.Text.Json.JsonElement element)
        {
            jsonElement = element;
        }
        else
        {
            var jsonText = System.Text.Json.JsonSerializer.Serialize(data);
            jsonElement = System.Text.Json.JsonDocument.Parse(jsonText).RootElement;
        }

        var options = new System.Text.Json.JsonSerializerOptions 
        { 
            PropertyNameCaseInsensitive = true 
        };

        var entity = System.Text.Json.JsonSerializer.Deserialize(jsonElement.GetRawText(), entityType, options);
        if (entity == null)
            throw new InvalidOperationException($"Failed to deserialize data to {entityType.Name}");

        return entity;
    }
}