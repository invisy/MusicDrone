using Microsoft.AspNetCore.Identity;

namespace MySensors.Web.ViewModels
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}