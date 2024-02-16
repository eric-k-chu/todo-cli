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
        static string dataFile = "data.json";

        static void Main(string[] args)
        {
            if (args.Length < 2)
            {
                Console.WriteLine("Usage: <operation> <cmd>");
            }

            // Reading from file
            string jsonTodos = File.ReadAllText(dataFile);
            Todos todos = JsonSerializer.Deserialize<Todos>(jsonTodos)!;

            
            // Write to file
            jsonTodos = JsonSerializer.Serialize(todos, new JsonSerializerOptions { WriteIndented = true});
            File.WriteAllText(dataFile, jsonTodos);
        }
    }
}
