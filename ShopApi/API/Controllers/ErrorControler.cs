using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("errors/{code}")]
    //da proradi swager
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorControler : BaseApiController
    {
        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }


    }
}
