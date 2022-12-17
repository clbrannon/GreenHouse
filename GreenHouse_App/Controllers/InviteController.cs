using Microsoft.AspNetCore.Mvc;
using GreenHouse_App.Interfaces;
using GreenHouse_App.Models;

namespace GreenHouse_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InviteController : ControllerBase
    {
        private IInviteRepository _inviteRepo;
        public InviteController(IInviteRepository inviteRepo)
        {
            _inviteRepo = inviteRepo;
        }

        // POST api/<InviteController>
        [HttpPost("{id}/{itemId}")]
        public void Post(int sentToUserId, int ownerUserId, int greenHouse)
        {

            {
                _inviteRepo.CreateInvite(sentToUserId, ownerUserId, greenHouse);
            }
        }
    }
}
    

