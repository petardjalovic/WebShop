namespace Core.Entities.OrderAgregate
{
    public class DeliveryMethod : BaseEntity
    {
        public string ShortName { get; set; }
        public string DeliveryDate { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
