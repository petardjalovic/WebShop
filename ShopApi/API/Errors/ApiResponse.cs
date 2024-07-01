namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatuscode(statusCode);
        }

        private string GetDefaultMessageForStatuscode(object statuscode)
        {
            return statuscode switch
            {
                400 => "A very bad request",
                401 => "you are not Autorized",
                404 => "Resource not found",
                500 => "bump",
                _ => null
            };
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

    }
}
