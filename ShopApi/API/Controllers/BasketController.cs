using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.interfaces;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IConnectionMultiplexer _redis;
        private readonly IMapper _mapper;
        private readonly IBasketRepository _basketRpository;
        public BasketController(IBasketRepository basketRpository, IConnectionMultiplexer redis, IMapper mapper)
        {
            _basketRpository = basketRpository;
            _redis = redis;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketbyId(string id)
        {
            var basket = await _basketRpository.GetBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id));
        }
        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
        {
            var customerbasket = _mapper.Map<CustomerBasketDto, CustomerBasket>(basket);
            var updatedBasket = await _basketRpository.UpdateBasketAsync(customerbasket);
            return Ok(updatedBasket);
        }
        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await _basketRpository.DeleteBasketAsync(id);
        }
    }
}
