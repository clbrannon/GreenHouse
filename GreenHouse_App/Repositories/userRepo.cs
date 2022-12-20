using GreenHouse_App.Interfaces;
using GreenHouse_App.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace GreenHouse_App.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly IConfiguration _config;

        // The constructor accepts an IConfiguration object as a parameter. This class comes from the ASP.NET framework and is useful for retrieving things out of the appsettings.json file like connection strings.
        public UserRepository(IConfiguration config)
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

        public User getUserById(int userId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT *
                                FROM [user]
                                WHERE [user].id = @userId;
                            ";
                    cmd.Parameters.AddWithValue("@userId", userId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        User user = new User();
                        while (reader.Read())
                        {
                            user.Id = reader.GetInt32(reader.GetOrdinal("id"));
                            user.Image = reader.GetString(reader.GetOrdinal("image"));
                            user.Password = reader.GetString(reader.GetOrdinal("password"));
                            user.FullName = reader.GetString(reader.GetOrdinal("fullName"));
                            user.UserName = reader.GetString(reader.GetOrdinal("userName"));
                            user.GreenHouseId = reader.GetInt32(reader.GetOrdinal("greenHouseId"));
                           

                        };
                        return user;
                    }

                }
            }
        }

        public void addUser(User user)

        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    Insert Into [user]([image], [password], fullName, [userName], greenHouseId)
                    VALUES(@image, @password, @fullName, @userName, @greenHouseId)                        
                                ";

                    cmd.Parameters.AddWithValue("@image", user.Id);
                    cmd.Parameters.AddWithValue("@password", user.Password);
                    cmd.Parameters.AddWithValue("@fullName", user.FullName);
                    cmd.Parameters.AddWithValue("@userName", user.UserName);
                    cmd.Parameters.AddWithValue("@greenHouseId", user.GreenHouseId);

                    cmd.ExecuteNonQuery();



                }
            }
        }







    }
    
}

