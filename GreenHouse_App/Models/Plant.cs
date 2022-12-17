
    namespace GreenHouse_App.Models
    {
        public class Plant
        {
            public int Id { get; set; }
            public int greenHouse { get; set; }
            public string url { get; set; }
            public string commonName { get; set; }
            public string sciName { get; set; }
            public string description { get; set; }
            public string light { get; set; }
            public string soil { get; set; }
            public DateTime lastWatered { get; set; }
            public string notes { get; set; }

        }
    }