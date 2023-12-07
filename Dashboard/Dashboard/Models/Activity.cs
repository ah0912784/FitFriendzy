namespace Dashboard.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public DateOnly Date {get; set; }
        public string Description { get; set; }
        public int Points { get; set; }



    }
}
