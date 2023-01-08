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

        public User getUserByName(string username)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT *
                                FROM [user]
                                WHERE [user].userName = @username;
                            ";
                    cmd.Parameters.AddWithValue("@username", username);
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
                            user.GreenHouse = reader.GetString(reader.GetOrdinal("greenHouse"));
                           

                        };
                        return user;
                    }

                }
            }
        }


        public List<User> GetAllUsers()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT *
                                FROM [user]                               
                            ";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<User> users = new List<User>();
                        while (reader.Read())
                        {
                            User user = new User()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                Image = reader.GetString(reader.GetOrdinal("image")),
                                Password = reader.GetString(reader.GetOrdinal("password")),
                                FullName = reader.GetString(reader.GetOrdinal("fullName")),
                                UserName = reader.GetString(reader.GetOrdinal("userName")),
                                GreenHouse = reader.GetString(reader.GetOrdinal("greenHouse"))
                            };
                            users.Add(user);
                        }

                        return users;
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
                    Insert Into [user]([image], [password], fullName, [userName], greenHouse)
                    VALUES(@image, @password, @fullName, @userName, @greenHouse)                        
                                ";

                    cmd.Parameters.AddWithValue("@image", user.Id);
                    cmd.Parameters.AddWithValue("@password", user.Password);
                    cmd.Parameters.AddWithValue("@fullName", user.FullName);
                    cmd.Parameters.AddWithValue("@userName", user.UserName);
                    cmd.Parameters.AddWithValue("@greenHouse", user.GreenHouse);

                   // try {
                    cmd.ExecuteNonQuery();
                  //  }
                  //  catch {
                    
                  //  }
                    



                }
            }
        }







    }
    
}

