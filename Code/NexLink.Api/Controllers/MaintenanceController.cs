using Microsoft.AspNetCore.Mvc;
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
        public IActionResult GetAvailableTables()
        {
            var assembly = Assembly.Load("NexLink.Core");

            // Get all classes in the Entities namespace
            var tables = assembly.GetTypes()
                .Where(t => t.IsClass && t.Namespace == "NexLink.Core.Entities")
                .Select(t => new {
                    DisplayName = t.Name, // e.g., "Country"
                    RouteValue = t.Name   // The string used for the API call
                })
                .OrderBy(t => t.DisplayName)
                .ToList();

            return Ok(tables);
        }
    }
}