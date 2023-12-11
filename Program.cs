using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace WebApplication1
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			var app = builder.Build();

			app.MapGet("/", context =>
			{
				var htmlContent = File.ReadAllText("htmlpage.html");
				return context.Response.WriteAsync(htmlContent);
			});

			app.Run();
		}
	}
}
