using GreenHouse_App.Models;

namespace GreenHouse_App.Interfaces
{
    public interface IUserRepository
    {

        public User getUserById(int userId);
        public void addUser(User user);

    }
}
