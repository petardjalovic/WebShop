namespace API.Dtos
{
    public class OrderDto
    {
        public string basketId { get; set; }
        public int DeliveryMethodid { get; set; }
        public AddressDto adress { get; set; }
    }
}
