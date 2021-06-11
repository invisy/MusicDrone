using System.ComponentModel.DataAnnotations;

namespace MySensors.Web.ViewModels
{
    public class LoginRequest
    {
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
    }
}