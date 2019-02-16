using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel;
using Microsoft.IdentityModel.Tokens;
using Amazon.Extensions.NETCore.Setup;
using Amazon.DynamoDBv2;
using Amazon;
using Amazon.Runtime;
using Amazon.Runtime.CredentialManagement;
using DotnetcoreReactRedux.Services;

namespace DotnetcoreReactRedux
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Enable CORS.
            services.AddCors();

            // Add MVC service.
            services.AddMvc();

            // Create AWS Profile options for basic profile.
            var awsProfileOptions = new Amazon.Runtime.CredentialManagement.CredentialProfileOptions()
            {
                AccessKey = Configuration.GetValue<string>("Secrets:AWS:AccessKey"),
                SecretKey = Configuration.GetValue<string>("Secrets:AWS:AccessKeySecret"),
            };

            // Creates basic profile with above options, then set AWS region.
            var awsProfile = new Amazon.Runtime.CredentialManagement.CredentialProfile("basic-profile", awsProfileOptions);
            awsProfile.Region = RegionEndpoint.APNortheast2;

            // Registers AWS profile to AWS SDK's .NET SDK credentials file.
            var sdkFile = new NetSDKCredentialsFile();
            sdkFile.RegisterProfile(awsProfile);

            // Add AWS options.
            services.AddDefaultAWSOptions(new AWSOptions() { Region = RegionEndpoint.APNortheast2, Profile = awsProfile.Name });

            // Add DynamoDB service.
            services.AddAWSService<IAmazonDynamoDB>();

            // Add UserServices.
            // If want to use classic user service, use `UserService`.
            services.AddScoped<IUserService, DynamoDBUserService>();

            // Configure JWT authentication.
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false; // NOTE: This should be set to `true` on production.
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.ASCII.GetBytes(Configuration.GetValue<string>("Secrets:JWT"))),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // In production, the React files will be served from this directory
            // This code portion is not related to webpack_hmr.
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "wwwroot/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true,
                    ConfigFile = System.IO.Path.Combine(env.ContentRootPath, "ClientApp", "webpack.config.js"),
                    ProjectPath = System.IO.Path.Combine(env.ContentRootPath, "ClientApp")
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            // Global CORS policy.
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            // Enable authentication.
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
