using API.Errors;
using Core.interfaces;
using Infrastructure.Repository;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection addApplicationServices(this IServiceCollection services)
        {
            services.AddSingleton<HttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IUnitofWork, UnitOfWork>();
            services.AddScoped<IProductRepository, ProductRepository>();// di product
            var multiplexer = ConnectionMultiplexer.Connect("localhost");
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddSingleton<IConnectionMultiplexer>(multiplexer);

            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
            services.Configure<ApiBehaviorOptions>(options =>
             {
                 options.InvalidModelStateResponseFactory = ActionContext =>
                 {
                     var errors = ActionContext.ModelState.Where(e => e.Value.Errors.Count > 0).SelectMany(x => x.Value.Errors).Select(x => x.ErrorMessage).ToArray();
                     var errorResponse = new ApiValidationErrorresponse
                     {
                         Errors = errors
                     };
                     return new BadRequestObjectResult(errorResponse);
                 };
             });
            return services;
        }
    }
}
