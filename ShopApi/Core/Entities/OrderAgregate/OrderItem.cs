namespace Core.Entities.OrderAgregate
{
    public class OrderItem : BaseEntity

    {
        public OrderItem()
        {

        }
        public OrderItem(ProductItemOrderd itemOrderd, decimal price, int quantity)
        {
            this.itemOrderd = itemOrderd;
            this.price = price;
            this.quantity = quantity;
        }

        public ProductItemOrderd itemOrderd { get; set; }
        public decimal price { get; set; }
        public int quantity { get; set; }
    }
}
