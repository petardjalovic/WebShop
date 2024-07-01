
using API.Extensions;
using API.Helpers;
using API.middleware;
using Core.Entities.identity;
using Infrastructure.Data;
using Infrastructure.Data.identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;



var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//dodatne servis klase

builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.addApplicationServices();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();






//datacontext.
builder.Services.AddDbContext<DataContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));






builder.Services.AddAutoMapper(typeof(MappingProfiles));

//enble cors tj povezivanje sa angularom
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins, builder =>
    {
        builder.WithOrigins("https://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});





var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DataContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    var loggerFactory = scope.ServiceProvider.GetRequiredService<ILoggerFactory>();

    var identityContext = scope.ServiceProvider.GetRequiredService<DataContext>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
    try
    {
        await context.Database.MigrateAsync();
        await StoreContextSeed.SeedAsync(context, loggerFactory);

        await identityContext.Database.MigrateAsync();
        await AppIdentityDbContextSeed.SeedUserAsync(userManager);
    }
    catch (System.Exception ex)
    {
        logger.LogError(ex, "Error in migrating data");
    }
}

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//redirektuje na greske controler
app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseHttpsRedirection();
//dodavanje cors
app.UseCors(myAllowSpecificOrigins);

app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
