using Microsoft.AspNetCore.Mvc;
using GreenHouse_App.Interfaces;
using GreenHouse_App.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GreenHouse_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantController : ControllerBase
    {

        private IPlantRepository _plantRepo;

        public PlantController(IPlantRepository plantRepo)
        {
            _plantRepo = plantRepo;
        }
        // GET: api/<ItemController>
        [HttpGet]
        public List<Plant> Get()
        {
            var returnVar = _plantRepo.GetAllPlants();
            return returnVar;
        }

        [HttpGet("{greenHouseId}")]
        public List<Plant> Get(int greenHouseId)
        {
            var returnVar = _plantRepo.GetPlantsByGreenHouse(greenHouseId);
            return returnVar;
        }
    }
}