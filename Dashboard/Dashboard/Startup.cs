using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddMemoryCache();
        services.AddControllers();

        services.AddSpaStaticFiles(configuration =>
        {
            configuration.RootPath = "ClientApp/dist";
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (!env.IsDevelopment())
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios.
            app.UseHsts();
        }

        app.UseStaticFiles(new StaticFileOptions
        {
            OnPrepareResponse = ctx =>
            {
                ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=31536000");
            }
        });

        app.UseSpaStaticFiles();
        app.UseRouting();
        app.UseCors("CorsPolicy");
        app.UseHttpsRedirection();
        

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

        // Serve the fallback file for client-side routing
        app.UseSpa(spa =>
        {
            spa.Options.SourcePath = "ClientApp/dist";
            spa.Options.DefaultPage = "/index.html";
        });

        // If you want to add further middleware, place it here.
    }
}
