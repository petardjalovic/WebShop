using API.Core.Entities;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.identity;
using Core.Entities.OrderAgregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
            .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
            .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
            .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemsDto, BasketItem>();
            CreateMap<AddressDto, OrderAdress>().ReverseMap();
            CreateMap<Order, OrdertoReturnDto>()
                .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));
            CreateMap<OrderItem, OrderItemDto>()
            .ForMember(d => d.ProducId, o => o.MapFrom(s => s.itemOrderd.ProductItemId))
            .ForMember(d => d.ProductName, o => o.MapFrom(s => s.itemOrderd.ProductName))
            .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.itemOrderd.PictureUrl))
            .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
            CreateMap<ProductInsertDto, Product>();
        }
    }
}
