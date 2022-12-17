using GreenHouse_App.Interfaces;
using GreenHouse_App.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace GreenHouse_App.Repositories
{
    public class InviteRepository : IInviteRepository
    {
        private readonly IConfiguration _config;

        // The constructor accepts an IConfiguration object as a parameter. This class comes from the ASP.NET framework and is useful for retrieving things out of the appsettings.json file like connection strings.
        public InviteRepository(IConfiguration config)
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

        public void CreateInvite(int sentToUser, int ownerUserId, int greenHouseId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            INSERT INTO invitation (sentToUserId, ownerUserId, greenHouse)
                            VALUES (@sentToUser, @ownerUserId, @greenHouseId);
                            ";

                    cmd.Parameters.AddWithValue("@sentToUser", sentToUser);
                    cmd.Parameters.AddWithValue("@ownerUserId", ownerUserId);
                    cmd.Parameters.AddWithValue("@greenHouseId", greenHouseId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}