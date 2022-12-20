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



        // GET: api/<PlantController>
        [HttpGet]
        public List<Plant> Get()
        {
            var returnVar = _plantRepo.GetAllPlants();
            return returnVar;
        }

        [HttpGet("GH{greenHouseId}")]
        public List<Plant> GetPlants(int greenHouseId)
        {
            var returnVar = _plantRepo.GetPlantsByGreenHouse(greenHouseId);
            return returnVar;
        }

        [HttpGet("Plant{PlantId}")]
        public Plant GetPlant(int PlantId)
        {
            var returnVar = _plantRepo.GetPlantById(PlantId);
            return returnVar;
        }

        [HttpPost("")]
        public void Post(Plant plant)
        {         
                _plantRepo.addPlant(plant);         
        }

        [HttpDelete("{plantId}")]
        public void Delete(int plantId)
        {
            _plantRepo.deletePlant(plantId);
        }

        [HttpPut("{PlantId}")]
        public void Put(Plant plant)
        {
            _plantRepo.updatePlant(plant);
           
        }




    }
}