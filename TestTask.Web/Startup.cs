using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TestTask.DAL;
using System;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

[assembly: ApiController]

namespace TestTask.Web
{
    public class Startup
    {
        private Assembly _logicAssembly;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            InitAssemblies();
        }

        private void InitAssemblies()
        {
            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();
            _logicAssembly = GetAssembly("TestTask.Logic", assemblies);
        }

        private Assembly GetAssembly(string name, Assembly[] assemblies)
        {
            return assemblies.SingleOrDefault(a => a.GetName().Name == name) ?? Assembly.Load(name);
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TestTaskContext>(options => options.UseSqlite(Configuration.GetConnectionString("TestDb")));

            services.AddIdentity<IdentityUser<int>, IdentityRole<int>>()
                .AddEntityFrameworkStores<TestTaskContext>()
                .AddDefaultTokenProviders();

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.HttpOnly = true;
                options.SlidingExpiration = true;
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            RegisterLogicServices(services);
        }

        private void RegisterLogicServices(IServiceCollection services)
        {
            var servicesTypes = _logicAssembly.GetTypes()
                .Where(t => t.IsClass
                            && t.Namespace != null
                            && t.Namespace.EndsWith("Services")
                            && !t.IsNested);
            foreach (Type service in servicesTypes)
            {
                services.AddScoped(service);
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseAuthentication();
            app.UseMvc();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                }
            });
        }
    }
}