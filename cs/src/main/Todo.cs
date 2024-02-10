namespace Todo
{
    public class TodoItem
    {
        public int IsCompleted { get; set; }
        public string Title { get; set; }
    }

    public class Todos
    {
        public int NextId { get; set; }
        public Dictionary<string, TodoItem> TodoList { get; set; }
    }
}