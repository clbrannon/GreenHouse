using GreenHouse_App.Interfaces;
using GreenHouse_App.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace GreenHouse_App.Repositories
{
    public class GreenHouseRepository : IGreenHouseRepository
    {
        private readonly IConfiguration _config;

        // The constructor accepts an IConfiguration object as a parameter. This class comes from the ASP.NET framework and is useful for retrieving things out of the appsettings.json file like connection strings.
        public GreenHouseRepository(IConfiguration config)
        {
            _config = config;
        }
        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        public GreenHouse GetGreenHouseByUserId(int userId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                Select greenHouse.id, greenHouse.houseName
                                From greenHouse
                                Inner Join [user] ON [user].greenHouseId = greenHouse.id
                                WHERE [user].id = @userId

                            ";
                    cmd.Parameters.AddWithValue("@userId", userId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        GreenHouse greenHouse = new GreenHouse();
                        while (reader.Read())
                        {
                            greenHouse.Id = reader.GetInt32(reader.GetOrdinal("id"));
                            greenHouse.houseName = reader.GetString(reader.GetOrdinal("houseName"));
                        };

                         return greenHouse;
                      

                    }
                }
            }

        }

        public void addGreenHouse(GreenHouse greenHouse)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO greenHouse (houseName)
                        VALUES (@houseName)

                            ";
                    cmd.Parameters.AddWithValue("@houseName", greenHouse.houseName);

                    cmd.ExecuteNonQuery();



                }
            }

        }




    }
}
