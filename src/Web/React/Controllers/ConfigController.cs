using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace React.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConfigController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly IOptionsSnapshot<AppSettings> _settings;
        
        public ConfigController(IWebHostEnvironment env, IOptionsSnapshot<AppSettings> settings)
        {
            _env = env;
            _settings = settings;
        }
        

        [HttpGet]
        public IActionResult Configuration()
        {
            return Ok(JsonSerializer.Serialize(_settings.Value));
        }
    }
}
