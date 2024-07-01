using API.Core.Entities;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{


    public class ProductsController : BaseApiController
    {
        private readonly IUnitofWork _unitofWork;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;

        public ProductsController(IGenericRepository<Product> productsRepo, IGenericRepository<ProductBrand> productBrandRepo, IGenericRepository<ProductType> productTypeRepo,
            IMapper mapper, IUnitofWork unitofWork)
        {
            _mapper = mapper;
            _productsRepo = productsRepo;
            _productBrandRepo = productBrandRepo;
            _productTypeRepo = productTypeRepo;
            _unitofWork = unitofWork;
        }
        //Prpducts 
        [HttpPost]
        public async Task<ActionResult<ProductInsertDto>> AddProduct(ProductInsertDto product)
        {
            var products = _mapper.Map<ProductInsertDto, Product>(product);
            if (products == null)
            {
                return Problem("Entity set 'DataContext.Product'  is null.");

            }
            _unitofWork.Rpository<Product>().Add(products);
            var res = await _unitofWork.Complete();

            return Ok(products);


        }
        //DELETE api/product/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteproductAsync(int id)
        {
            var product = await _unitofWork.Rpository<Product>().GetByIdAsync(id);
            _unitofWork.Rpository<Product>().Delete(product);
            var result = await _unitofWork.Complete();
            if (result <= 0) return BadRequest();
            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCommand(int id, ProductInsertDto producDto)
        {

            var product = await _unitofWork.Rpository<Product>().GetByIdAsync(id);

            _mapper.Map(producDto, product);

            _unitofWork.Rpository<Product>().Update(product);

            var result = await _unitofWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating product"));

            return Ok(product);

        }
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrands(productParams);
            var countSpec = new ProductWithFiltersForCountSpecification(productParams);
            var totalItems = await _unitofWork.Rpository<Product>().CountAsync(countSpec);
            var products = await _unitofWork.Rpository<Product>().ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));

        }
        //getall
        [HttpGet("all")]
        public async Task<ActionResult<ProductToReturnDto>> GetProducts()
        {
            var products = await _unitofWork.Rpository<Product>().ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(data);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProuct(int id)
        {
            var spec = new ProductsWithTypesAndBrands(id);

            var product = await _unitofWork.Rpository<Product>().GetEntityWithSpec(spec);
            if (product == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        //BRANDS

        [HttpGet("brands")]
        public async Task<ActionResult<ProductBrand>> GetProductBrands()
        {
            return Ok(await _unitofWork.Rpository<ProductBrand>().ListAllAsync());
            //TYPES
        }
        [HttpGet("types")]
        public async Task<ActionResult<ProductBrand>> GetProductTypes()
        {
            return Ok(await _unitofWork.Rpository<ProductType>().ListAllAsync());
        }
    }
}
