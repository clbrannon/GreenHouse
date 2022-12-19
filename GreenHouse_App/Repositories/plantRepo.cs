using GreenHouse_App.Interfaces;
using GreenHouse_App.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace GreenHouse_App.Repositories
{
    public class PlantRepository : IPlantRepository
    {
        private readonly IConfiguration _config;

        // The constructor accepts an IConfiguration object as a parameter. This class comes from the ASP.NET framework and is useful for retrieving things out of the appsettings.json file like connection strings.
        public PlantRepository(IConfiguration config)
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

        public List<Plant> GetAllPlants()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT *
                                FROM plant
                            ";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Plant> plants = new List<Plant>();
                        while (reader.Read())
                        {
                            Plant plant = new Plant()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                greenHouse = reader.GetInt32(reader.GetOrdinal("greenHouse")),
                                url = reader.GetString(reader.GetOrdinal("image")),
                                commonName = reader.GetString(reader.GetOrdinal("commonName")),
                                sciName = reader.GetString(reader.GetOrdinal("sciName")),
                                description = reader.GetString(reader.GetOrdinal("description")),
                                light = reader.GetString(reader.GetOrdinal("light")),
                                soil = reader.GetString(reader.GetOrdinal("soil")),
                                lastWatered = reader.GetDateTime(reader.GetOrdinal("lastWatered")),
                                notes = reader.GetString(reader.GetOrdinal("notes"))

                            };
                            plants.Add(plant);
                        }
                        return plants;
                    }
                }
            }

        }

        public List<Plant> GetPlantsByGreenHouse(int greenHouseId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT plant.*
                                FROM greenHouse
                                INNER JOIN plant ON greenHouse.id=plant.greenHouse
                                WHERE greenHouse.id = @greenHouseId;
                            ";
                    cmd.Parameters.AddWithValue("@greenHouseId", greenHouseId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Plant> plants = new List<Plant>();
                        while (reader.Read())
                        {
                            Plant plant = new Plant()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                greenHouse = reader.GetInt32(reader.GetOrdinal("greenHouse")),
                                url = reader.GetString(reader.GetOrdinal("image")),
                                commonName = reader.GetString(reader.GetOrdinal("commonName")),
                                sciName = reader.GetString(reader.GetOrdinal("sciName")),
                                description = reader.GetString(reader.GetOrdinal("description")),
                                light = reader.GetString(reader.GetOrdinal("light")),
                                soil = reader.GetString(reader.GetOrdinal("soil")),
                                lastWatered = reader.GetDateTime(reader.GetOrdinal("lastWatered")),
                                notes = reader.GetString(reader.GetOrdinal("notes"))

                            };
                            plants.Add(plant);
                        }
                        return plants;
                    }
                }
            }

        }

        public Plant GetPlantById(int plantId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT *
                                FROM Plant
                                WHERE plant.id = @plantId;
                            ";
                    cmd.Parameters.AddWithValue("@plantId", plantId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Plant plant = new Plant();
                        while (reader.Read())
                        {
                            plant.Id = reader.GetInt32(reader.GetOrdinal("id"));
                            plant.greenHouse = reader.GetInt32(reader.GetOrdinal("greenHouse"));
                            plant.url = reader.GetString(reader.GetOrdinal("image"));
                            plant.commonName = reader.GetString(reader.GetOrdinal("commonName"));
                            plant.sciName = reader.GetString(reader.GetOrdinal("sciName"));
                            plant.description = reader.GetString(reader.GetOrdinal("description"));
                            plant.light = reader.GetString(reader.GetOrdinal("light"));
                            plant.soil = reader.GetString(reader.GetOrdinal("soil"));
                            plant.lastWatered = reader.GetDateTime(reader.GetOrdinal("lastWatered"));
                            plant.notes = reader.GetString(reader.GetOrdinal("notes"));

                        };
                        return plant;
                    }

                }
            }
        }

        public void addPlant(Plant plant)

        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    Insert Into plant(greenHouse, [image], commonName, sciName, [description], light, soil, lastWatered, notes)
                    VALUES(@GreenHouse, @image, @commonName, @sciName, @desc, @light, @soil, @date, @notes)                        
                                ";

                    cmd.Parameters.AddWithValue("@GreenHouse", plant.greenHouse);
                    cmd.Parameters.AddWithValue("@image", plant.url);
                    cmd.Parameters.AddWithValue("@commonName", plant.commonName);
                    cmd.Parameters.AddWithValue("@sciName", plant.sciName);
                    cmd.Parameters.AddWithValue("@desc", plant.description);
                    cmd.Parameters.AddWithValue("@light", plant.light);
                    cmd.Parameters.AddWithValue("@soil", plant.soil);
                    cmd.Parameters.AddWithValue("@date", plant.lastWatered);
                    cmd.Parameters.AddWithValue("@notes", plant.notes);

                    cmd.ExecuteNonQuery();



                }
            }
        }

        public void deletePlant(int plantId)

        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    Delete 
                                    From Plant
                                    WHERE id = @plantId
                                ";

                    cmd.Parameters.AddWithValue("@plantId", plantId);


                    cmd.ExecuteNonQuery();



                }
            }
        }










    }
}



