using System.Security.Claims;

namespace API.Helpers
{
    public static class ClaimsPrincipalExtrnsions
    {


        public static string RetriveEmailFromPrincipal(this ClaimsPrincipal user)
        {
            return user.FindFirstValue(ClaimTypes.Email);
        }

    }
}
