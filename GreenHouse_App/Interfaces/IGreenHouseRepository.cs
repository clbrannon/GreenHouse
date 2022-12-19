using GreenHouse_App.Models;

namespace GreenHouse_App.Interfaces
{
    public interface IGreenHouseRepository
    {

        GreenHouse GetGreenHouseByUserId(int userId);

    }
}
