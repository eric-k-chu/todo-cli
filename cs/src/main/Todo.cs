namespace Todo
{
    public class TodoItem
    {
        public bool IsCompleted { get; set; }
        public string Title { get; set; }

        public TodoItem(string title)
        {
            IsCompleted = false;
            Title = title;
        }
    }

    public class Todos
    {
        public int NextId { get; set; }
        public Dictionary<string, TodoItem> TodoList { get; set; }

        public Todos()
        {
            NextId = 0;
            TodoList = new Dictionary<string, TodoItem> { };
        }
    }
}