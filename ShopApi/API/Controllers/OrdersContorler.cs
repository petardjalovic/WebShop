using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities.OrderAgregate;
using Core.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class OrdersContorler : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;


        public OrdersContorler(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;

        }
        [HttpPost]

        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {

            var BuyerEmail = HttpContext.User.RetriveEmailFromPrincipal();
            var address = _mapper.Map<AddressDto, OrderAdress>(orderDto.adress);
            var order = await _orderService.CreateOrderAsync(BuyerEmail, orderDto.DeliveryMethodid, orderDto.basketId, address);
            if (order == null) return BadRequest(new ApiResponse(400, "problem creating order"));
            return Ok(order);
        }


        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrdertoReturnDto>>> GetOrdersForUser()
        {
            var email = HttpContext.User.RetriveEmailFromPrincipal();
            var orders = await _orderService.GetOrdersforUserAsync(email);
            return Ok(_mapper.Map<IReadOnlyList<OrdertoReturnDto>>(orders));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<OrdertoReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.RetriveEmailFromPrincipal();
            var order = await _orderService.GetOrdersbyIDAsync(id, email);
            if (order == null) return NotFound(new ApiResponse(404));
            return _mapper.Map<OrdertoReturnDto>(order);
        }
        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _orderService.GetDeliveryMethodsAsync());
        }
    }
}
