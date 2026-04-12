using NexLink.Core.Interfaces;
using NexLink.Infrastructure.Data;
using NexLink.Infrastructure.Repositories;
using NexLink.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// --- 1. DATABASE & DI REGISTRATION ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ExlinkContext>(options =>
    options.UseSqlServer(connectionString));

// Register Generic Repository & Specialized Services
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IMaintenanceService, MaintenanceService>();

// --- 2. API CONFIGURATION ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --- 3. CORS POLICY DEFINITION ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("NexLinkCorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// --- 4. MIDDLEWARE PIPELINE (ORDER IS CRITICAL) ---

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();

// IMPORTANT: Routing must come before CORS
app.UseRouting();

// IMPORTANT: This was missing! It activates the policy we defined above
app.UseCors("NexLinkCorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();