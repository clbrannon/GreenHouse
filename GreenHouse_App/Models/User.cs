﻿namespace GreenHouse_App.Models
{
    public class User
    {
        public int Id { get; set; }
        public string userName { get; set; }
        public string image { get; set; }
        public string password { get; set; }
        public string fullName { get; set; }
        public int greenHouseId { get; set; }

    }
}
