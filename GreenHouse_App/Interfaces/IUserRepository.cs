using GreenHouse_App.Models;

namespace GreenHouse_App.Interfaces
{
    public interface IUserRepository
    {

        public User getUserByName(string username);
        public List<User> GetAllUsers();
        public void addUser(User user);

    }
}
