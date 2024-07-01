using Core.Entities.OrderAgregate;

namespace Core.interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethode, string basketId, OrderAdress shippingAddress);
        Task<IReadOnlyList<Order>> GetOrdersforUserAsync(string buyerEmail);
        Task<Order> GetOrdersbyIDAsync(int id, string buyerEmail);
        Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
    }
}
