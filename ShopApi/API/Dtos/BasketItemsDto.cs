using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class BasketItemsDto
    {
        [Required]
        public int id { get; set; }
        [Required]
        public string Productname { get; set; }
        [Required]
        [Range(0.1, double.MaxValue, ErrorMessage = "price must be grater then 0 ")]
        public decimal Price { get; set; }
        [Required]
        [Range(1, double.MaxValue, ErrorMessage = "quantity must be grater then 0 ")]
        public int Quantity { get; set; }

        public string PictureUrl { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Type { get; set; }
    }
}
