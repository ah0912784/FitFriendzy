namespace Dashboard.Models
{
    public class User
    {
        private int Id { get; set; }
        public string Name { get; set; }

        public int GetUserId()
        {
            return this.Id;
        }
    }
}
