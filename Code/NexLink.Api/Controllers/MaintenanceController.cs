using Microsoft.AspNetCore.Mvc;
using NexLink.Core.Interfaces;
using System.Text.Json;

namespace NexLink.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaintenanceController : ControllerBase
    {
        private readonly IMaintenanceService _maintenanceService;

        public MaintenanceController(IMaintenanceService maintenanceService)
        {
            _maintenanceService = maintenanceService;
        }

        /// <summary>
        /// Get all maintenance table configurations
        /// </summary>
        [HttpGet("tables")]
        public async Task<IActionResult> GetAvailableTables()
        {
            try
            {
                var tables = await _maintenanceService.GetAvailableTablesAsync();
                return Ok(tables);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving tables", error = ex.Message });
            }
        }

        /// <summary>
        /// Get all records from a specific maintenance table
        /// </summary>
        [HttpGet("{tableName}")]
        public async Task<IActionResult> GetAllRecords(string tableName)
        {
            try
            {
                var data = await _maintenanceService.GetTableDataAsync(tableName);
                return Ok(data);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error retrieving records from {tableName}", error = ex.Message });
            }
        }

        /// <summary>
        /// Get a specific record by ID from a maintenance table
        /// </summary>
        [HttpGet("{tableName}/{id}")]
        public async Task<IActionResult> GetRecordById(string tableName, Guid id)
        {
            try
            {
                var record = await _maintenanceService.GetRecordByIdAsync(tableName, id);
                if (record == null)
                    return NotFound(new { message = $"Record with ID {id} not found in {tableName}" });

                return Ok(record);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error retrieving record from {tableName}", error = ex.Message });
            }
        }

        /// <summary>
        /// Create a new record in a maintenance table
        /// </summary>
        [HttpPost("{tableName}")]
        public async Task<IActionResult> CreateRecord(string tableName, [FromBody] JsonElement data)
        {
            try
            {
                if (data.ValueKind == JsonValueKind.Null || data.ValueKind == JsonValueKind.Undefined)
                    return BadRequest(new { message = "Request body cannot be empty" });

                await _maintenanceService.AddRecordAsync(tableName, data);
                return Created(string.Empty, new { message = "Record created successfully" });
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
                return StatusCode(500, new { message = $"Error creating record in {tableName}", error = ex.Message });
            }
        }

        /// <summary>
        /// Update an existing record in a maintenance table
        /// </summary>
        [HttpPut("{tableName}/{id}")]
        public async Task<IActionResult> UpdateRecord(string tableName, Guid id, [FromBody] JsonElement data)
        {
            try
            {
                if (data.ValueKind == JsonValueKind.Null || data.ValueKind == JsonValueKind.Undefined)
                    return BadRequest(new { message = "Request body cannot be empty" });

                await _maintenanceService.UpdateRecordAsync(tableName, id, data);
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
                return StatusCode(500, new { message = $"Error updating record in {tableName}", error = ex.Message });
            }
        }

        /// <summary>
        /// Delete a record from a maintenance table
        /// </summary>
        [HttpDelete("{tableName}/{id}")]
        public async Task<IActionResult> DeleteRecord(string tableName, Guid id)
        {
            try
            {
                await _maintenanceService.DeleteRecordAsync(tableName, id);
                return Ok(new { message = "Record deleted successfully" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error deleting record from {tableName}", error = ex.Message });
            }
        }
    }
}