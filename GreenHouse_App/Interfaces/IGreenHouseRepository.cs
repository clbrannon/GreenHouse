using GreenHouse_App.Models;

namespace GreenHouse_App.Interfaces
{
    public interface IGreenHouseRepository
    {

        GreenHouse GetGreenHouseByUserId(int userId);

        public void addGreenHouse(GreenHouse greenhouse);

    }
}
