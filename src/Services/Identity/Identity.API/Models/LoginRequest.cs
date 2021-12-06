using System.ComponentModel.DataAnnotations;

namespace Identity.API.Models
{
    public class LoginRequest
    {
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
    }
}