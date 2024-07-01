using Core.Entities.identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data.identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if (userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "petar",
                    Email = "petar@email.com",
                    UserName = "petar@email.com",
                    address = new Address
                    {
                        FirstName = "Petar",
                        LastName = "Petrovic",
                        Street = "Knez Mihajlova",
                        City = "Belgrade",
                        State = "SRB",
                        ZipCode = "11000"
                    }
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}
