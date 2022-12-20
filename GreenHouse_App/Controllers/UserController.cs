using Microsoft.AspNetCore.Mvc;
using GreenHouse_App.Interfaces;
using GreenHouse_App.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GreenHouse_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private IUserRepository _userRepo;

        public UserController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet("{userId}")]
        public User getUser(int userId)
        {
            return _userRepo.getUserById(userId);

        }

        [HttpPost("")]
        public void Post(User user)
        {
            _userRepo.addUser(user);
        }

    }
}
