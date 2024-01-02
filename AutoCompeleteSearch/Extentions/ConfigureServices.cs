using AutoCompeleteSearch.Services;
using AutoCompeleteSearch.Services.Concreate;

namespace AutoCompeleteSearch.Extentions;

public static class ConfigureServices
{
    private const string AllowWebAppOrigins = "_allowWebAppOrigins";

    public static IServiceCollection AddMainServices(this IServiceCollection services)
    {
        // Allowed CORS
        services.AddCors(options => options.AddPolicy(name: AllowWebAppOrigins,
                         policy => policy.AllowAnyMethod().AllowAnyHeader().AllowCredentials().SetIsOriginAllowed((hosts) => true)));

        services.AddControllers();
        services.AddEndpointsApiExplorer();

        // Add services to the container.
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddTransient<ICourseRepository, CourseRepository>();
        services.AddHttpContextAccessor();
        services.AddControllers();
        services.AddRazorPages();
        return services;
    }

    public static WebApplication UseWebAppCors(this WebApplication app)
    {
        app.UseCors(AllowWebAppOrigins);

        return app;
    }
}