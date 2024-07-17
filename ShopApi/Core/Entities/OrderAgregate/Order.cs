namespace Core.Entities.OrderAgregate
{
    public class Order : BaseEntity
    {


        public Order()
        {

        }

        public Order(IReadOnlyList<OrderItem> orderItems, string buyerEmail,
            OrderAdress shipToAddress, DeliveryMethod deliveryMethod,
            decimal subtotal)
        {

            BuyerEmail = buyerEmail;
            ShipToAddress = shipToAddress;
            DeliveryMethod = deliveryMethod;
            OrderItems = orderItems;
            Subtotal = subtotal;

        }

        public string? BuyerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public OrderAdress? ShipToAddress { get; set; }
        public DeliveryMethod? DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem>? OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.pending;


        public decimal GetTotal()
        {
            return Subtotal + DeliveryMethod.Price;
        }
    }
}
