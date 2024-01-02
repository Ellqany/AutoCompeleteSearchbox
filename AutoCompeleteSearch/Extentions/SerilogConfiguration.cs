using Serilog;
using Serilog.Core;
using Serilog.Events;

namespace AutoCompeleteSearch.Extentions;

public static class SerilogConfiguration
{
    public static Logger Configure(string path) => new LoggerConfiguration()
            .MinimumLevel.Debug()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
            .Enrich.FromLogContext()
            .WriteTo.Logger(l => l.Filter.ByIncludingOnly(e => e.Level == LogEventLevel.Information)
            .WriteTo.File($"{path}/Logs/Info/Log.log", fileSizeLimitBytes: 10485760, restrictedToMinimumLevel: LogEventLevel.Information, rollOnFileSizeLimit: true, rollingInterval: RollingInterval.Day))
            .WriteTo.Logger(l => l.Filter.ByIncludingOnly(e => e.Level == LogEventLevel.Warning)
            .WriteTo.File($"{path}/Logs/Warning/Log.log", fileSizeLimitBytes: 10485760, restrictedToMinimumLevel: LogEventLevel.Warning, rollOnFileSizeLimit: true, rollingInterval: RollingInterval.Day))
            .WriteTo.Logger(l => l.Filter.ByIncludingOnly(e => e.Level > LogEventLevel.Error)
            .WriteTo.File($"{path}/Logs/Errors/Log.log", fileSizeLimitBytes: 10485760, restrictedToMinimumLevel: LogEventLevel.Error, rollOnFileSizeLimit: true, rollingInterval: RollingInterval.Day))
            .WriteTo.Console()
            .CreateLogger();
}
