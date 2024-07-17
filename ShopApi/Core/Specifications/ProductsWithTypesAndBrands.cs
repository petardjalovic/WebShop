using API.Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrands : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrands(ProductSpecParams produdctParams)
            : base(x =>
            (string.IsNullOrEmpty(produdctParams.Search) || x.Name.ToLower().Contains(produdctParams.Search)) &&
            (!produdctParams.BrandId.HasValue || x.ProductBrandId == produdctParams.BrandId)
            && (!produdctParams.TypeId.HasValue || x.ProductTypeId == produdctParams.TypeId)) // kod da se namesti pretraga
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddorderBY(x => x.Name);
            ApplyPaging(produdctParams.PageSize * (produdctParams.PageIndex - 1), produdctParams.PageSize);
            if (!string.IsNullOrEmpty(produdctParams.Sort))
            {
                switch (produdctParams.Sort)
                {
                    case "priceAsc":
                        AddorderBY(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddorderBY(n => n.Name);
                        break;
                }
            }
        }
        public ProductsWithTypesAndBrands(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }

    }
}
