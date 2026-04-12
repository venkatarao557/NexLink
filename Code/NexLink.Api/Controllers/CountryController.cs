using NexLink.Core.Entities;
using NexLink.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace NexLink.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CountryController : ControllerBase
{
    private readonly IGenericRepository<Country> _repository;

    public CountryController(IGenericRepository<Country> repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Country>>> Get()
    {
        return Ok(await _repository.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Country>> Get(Guid id)
    {
        var item = await _repository.GetByIdAsync(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult> Post(Country country)
    {
        await _repository.AddAsync(country);
        return CreatedAtAction(nameof(Get), new { code = country.CountryCode }, country);
    }
}