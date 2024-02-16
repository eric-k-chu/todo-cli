using System.Text.Json;

namespace TodoApp
{
    class Todo
    {
        public bool isCompleted { get; set; } = false;
        public string todo { get; set; } = string.Empty;
    }

    class Todos
    {
        public int nextId { get; set; } = 0;
        public Dictionary<string, Todo> todoList { get; set; } = new Dictionary<string, Todo>();
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            if (args.Length < 2)
            {
                Console.WriteLine("Usage: <operation> <cmd>");
            }

            string jsonString = JsonSerializer.Serialize(new Todo { isCompleted = true });
            File.WriteAllText("test.json", jsonString);

            Console.WriteLine(jsonString);
        }
    }
}
