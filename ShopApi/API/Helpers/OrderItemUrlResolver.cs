﻿using API.Dtos;
using AutoMapper;
using Core.Entities.OrderAgregate;

namespace API.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration _config;

        public OrderItemUrlResolver(IConfiguration config)
        {
            _config = config;
        }
        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.itemOrderd.PictureUrl))
            {
                return _config["ApiUrl"] + source.itemOrderd.PictureUrl;
            }
            return null;
        }
    }
}