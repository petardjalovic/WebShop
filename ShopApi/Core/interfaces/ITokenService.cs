using Core.Entities.identity;

namespace Core.interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
