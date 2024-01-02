using AutoCompeleteSearch.Extentions;
using Microsoft.AspNetCore.HttpOverrides;
using Serilog;

string path = Directory.GetCurrentDirectory();
Log.Logger = SerilogConfiguration.Configure(path);

try
{
    var builder = WebApplication.CreateSlimBuilder(args);

    builder.WebHost.UseKestrelHttpsConfiguration();
    builder.WebHost.UseQuic();

    // Add services to the container.
    builder.Services.AddMainServices();
    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHsts();
    app.UseHttpsRedirection();
    app.UseStaticFiles();

    app.UseForwardedHeaders(new ForwardedHeadersOptions
    {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
    });
    app.UseRouting();
    app.UseWebAppCors();
    app.MapControllers();
    app.MapRazorPages();

    Log.Information("Starting up AutoCompleate Server");
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "An error occurred while migrating or seeding the database.");
    throw;
}
finally
{
    Log.CloseAndFlush();
}