using Microsoft.AspNetCore.Mvc;
using GreenHouse_App.Interfaces;
using GreenHouse_App.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GreenHouse_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GreenHouseController : ControllerBase
    {

        private IGreenHouseRepository _greenHouseRepo;

        public GreenHouseController(IGreenHouseRepository greenHouseRepo)
        {
            _greenHouseRepo = greenHouseRepo;
        }

        [HttpGet("{userId}")]
        public GreenHouse GetGreenHouseByUserId(int userId)
        {
            var returnVar = _greenHouseRepo.GetGreenHouseByUserId(userId);
            return returnVar;
        }

        [HttpPost("")]
        public void Post(GreenHouse greenHouse)
        {
            _greenHouseRepo.addGreenHouse(greenHouse);
        }

    }
}
