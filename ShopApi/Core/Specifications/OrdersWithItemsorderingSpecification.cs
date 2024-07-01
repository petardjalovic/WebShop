using Core.Entities.OrderAgregate;

namespace Core.Specifications
{
    public class OrdersWithItemsorderingSpecification : BaseSpecification<Order>
    {
        public OrdersWithItemsorderingSpecification(string email) : base(o => o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddInclude(o => o.OrderDate);
        }

        public OrdersWithItemsorderingSpecification(int id, string email) : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }
    }
}
