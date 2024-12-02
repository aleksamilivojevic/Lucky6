using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace WebApplication1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDirectoryBrowser();

            var app = builder.Build();

            app.UseDefaultFiles(); 
            app.UseStaticFiles(); 

            app.Run();
        }
    }
}
