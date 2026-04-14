using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NexLink.Core.Entities; // Assuming your Country model is here
using NexLink.Core.Interfaces;
using System.Reflection;

namespace NexLink.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaintenanceController : ControllerBase
    {
        // For dynamic maintenance, we use a service that isn't tied to one <T>
        private readonly IMaintenanceService _maintenanceService;

        public MaintenanceController(IMaintenanceService maintenanceService)
        {
            _maintenanceService = maintenanceService;
        }

        // GET: api/maintenance/{tableName}
        // This is what your Angular "DataManagerComponent" calls
        [HttpGet("{tableName}")]
        public async Task<IActionResult> Get(string tableName)
        {
            try
            {
                // Logic to fetch any NexLink table dynamically
                var data = await _maintenanceService.GetTableDataAsync(tableName);
                return Ok(data);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/maintenance/{tableName}
        [HttpPost("{tableName}")]
        public async Task<IActionResult> Post(string tableName, [FromBody] object data)
        {
            // Logic to insert into any dynamic table
            await _maintenanceService.AddRecordAsync(tableName, data);
            return Ok();
        }

        [HttpGet("tables")]
        public async Task<IActionResult> GetAvailableTables()
        {
            // Fetch only authorized maintenance tables from the registry
            var tables = await _maintenanceService.GetAvailableTablesAsync(); 
            return Ok(tables);
        }
    }
}