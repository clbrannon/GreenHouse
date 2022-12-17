namespace GreenHouse_App.Interfaces
{
    public interface IInviteRepository
    {

        void CreateInvite(int sentToUser, int ownerUserId, int greenHouseId);

    }
}
