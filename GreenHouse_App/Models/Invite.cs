namespace GreenHouse_App.Models
{
    public class Invite
    {
        public int Id { get; set; }
        public int sentToUserId { get; set; }
        public int ownerUserId { get; set; }
        public int GreenHouse { get; set; }
    }
}
