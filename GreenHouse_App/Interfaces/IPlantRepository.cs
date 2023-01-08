using GreenHouse_App.Models;

namespace GreenHouse_App.Interfaces
{
    public interface IPlantRepository
    {
        List<Plant> GetAllPlants();

        List<Plant> GetPlantsByUserId(int userId);

        Plant GetPlantById(int PlantId);

        void addPlant(Plant plant);

        void deletePlant(int plantId);

        void updatePlant(Plant plant);

    }
}