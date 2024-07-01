namespace API.Errors
{
    public class ApiValidationErrorresponse : ApiResponse
    {
        public ApiValidationErrorresponse() : base(400)
        {

        }
        public IEnumerable<string> Errors { get; set; }
    }
}
