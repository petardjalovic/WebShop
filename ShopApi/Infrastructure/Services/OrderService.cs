using API.Core.Entities;
using Core.Entities.OrderAgregate;
using Core.interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService

    {

        private readonly IBasketRepository _basketRpository;
        private readonly IUnitofWork _unitofWork;

        public OrderService(IBasketRepository basketRpository, IUnitofWork unitofWork)
        {
            _basketRpository = basketRpository;
            _unitofWork = unitofWork;
        }
        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethode, string basketId, OrderAdress shippingAddress)
        {
            var deliveryMethod = await _unitofWork.Rpository<DeliveryMethod>().GetByIdAsync(deliveryMethode);
            var basket = await _basketRpository.GetBasketAsync(basketId);
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _unitofWork.Rpository<Product>().GetByIdAsync(item.id);
                var itemOrderd = new ProductItemOrderd(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrderd, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }
            //  var deliveryMethod = await _unitofWork.Rpository<DeliveryMethod>().GetByIdAsync(deliveryMethode);
            var subttotal = items.Sum(item => item.price * item.quantity);
            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subttotal);
            _unitofWork.Rpository<Order>().Add(order);
            var result = await _unitofWork.Complete();
            if (result <= 0) return null;
            //await _basketRpository.DeleteBasketAsync(basketId);
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitofWork.Rpository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrdersbyIDAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsorderingSpecification(id, buyerEmail);
            return await _unitofWork.Rpository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersforUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsorderingSpecification(buyerEmail);
            return await _unitofWork.Rpository<Order>().ListAsync(spec);
        }
    }
}
