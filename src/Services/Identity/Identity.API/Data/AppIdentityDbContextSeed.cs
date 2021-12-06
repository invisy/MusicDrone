using System.Linq;
using System.Threading.Tasks;
using Identity.API.Constants;
using Identity.API.Models;
using Microsoft.AspNetCore.Identity;

namespace Identity.API.Data
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.Roles.Any())
            {
                await roleManager.CreateAsync(new IdentityRole(Roles.USERS));
                await roleManager.CreateAsync(new IdentityRole(Roles.PREMIUMUSERS));
                await roleManager.CreateAsync(new IdentityRole(Roles.MODERATORS));
                await roleManager.CreateAsync(new IdentityRole(Roles.ADMINISTRATORS));
            }

            if (!userManager.Users.Any())
            {
                var defaultUser = new ApplicationUser { UserName = "admin@music.drone", Email = "admin@music.drone", FirstName = "AdminName", LastName = "AdminLastName"};
                await userManager.CreateAsync(defaultUser, AuthorizationConstants.DEFAULT_PASSWORD);
                await userManager.AddToRoleAsync(defaultUser, Roles.ADMINISTRATORS);
            }
        }
    }
}