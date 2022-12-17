using GreenHouse_App.Models;

namespace GreenHouse_App.Interfaces
{
    public interface IPlantRepository
    {
        List<Plant> GetAllPlants();

        List<Plant> GetPlantsByGreenHouse(int GreenHouseId);
    }
}