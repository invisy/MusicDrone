using System.Threading.Tasks;

namespace Identity.API.Interfaces
{
    public interface ITokenClaimsService
    {
        Task<string> GetTokenAsync(string userName);
    }
}