using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using TestTask.DAL;
using TestTask.DAL.Entities.Identity;

[assembly: ApiController]

namespace TestTask.Web
{
    public class Startup
    {
        private Assembly _logicAssembly;
        private Assembly _webAssembly;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            InitAssemblies();
            ConfigMapping();
        }

        private void InitAssemblies()
        {
            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();
            _logicAssembly = GetAssembly("TestTask.Logic", assemblies);
            _webAssembly = GetAssembly("TestTask.Web", assemblies);
        }

        private void ConfigMapping()
        {
            MappingConfig.Init();
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

            services.AddIdentity<ApplicationUser, ApplicationRole>()
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
                options.Events.OnRedirectToAccessDenied = context =>
                {
                    context.Response.StatusCode = 403;
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
            RegisterMappers(services);
        }

        private void RegisterLogicServices(IServiceCollection serviceCollection)
        {
            var services = _logicAssembly.GetTypes()
                .Where(t => t.Namespace != null && t.Namespace.EndsWith("Services") && !t.IsNested)
                .ToArray();

            var interfaces = services.Where(t => t.IsInterface).ToArray();
            var implementations = services.Where(t => t.IsClass).ToArray();
            foreach (Type service in interfaces)
            {
                var implementation = implementations.SingleOrDefault(t => service.IsAssignableFrom(t));
                if (implementation != null)
                {
                    serviceCollection.AddScoped(service, implementation);
                }
            }
        }

        private void RegisterMappers(IServiceCollection serviceCollection)
        {
            var mappers = _webAssembly.GetTypes()
                .Where(t => t.Namespace != null && t.Namespace.EndsWith("Mappers"))
                .ToArray();

            foreach (Type mapper in mappers)
            {
                var @interface = mapper.GetInterface("IMapper`2");
                if (@interface != null)
                {
                    serviceCollection.AddScoped(@interface, mapper);
                }
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
                    //spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}