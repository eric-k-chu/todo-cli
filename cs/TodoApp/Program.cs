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
                return;
            }

            // Reading from file
            string jsonTodos = File.ReadAllText(dataFile);
            Todos todos = JsonSerializer.Deserialize<Todos>(jsonTodos)!;

            string operation = args[0];

            switch (operation)
            {
                case "create":
                    CreateTodo(ref todos, args[1]);
                    break;
                case "view":
                    Console.WriteLine("Create");
                    break;
                case "edit":
                    Console.WriteLine("Create");
                    break;
                case "delete":
                    Console.WriteLine("Create");
                    break;
                case "finish":
                    Console.WriteLine("Create");
                    break;
                case "unfinish":
                    Console.WriteLine("Create");
                    break;
                default:
                    Console.WriteLine("Unknown operation. Must be create, view, edit, delete, finish, or unfinish");
                    break;
            }

            // Write to file
            jsonTodos = JsonSerializer.Serialize(todos, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(dataFile, jsonTodos);
        }

        static void CreateTodo(ref Todos todo, string todoStr)
        {
            Todo newTodo = new Todo
            {
                isCompleted = false,
                todo = todoStr,
            };
            todo.todoList.Add(todo.nextId.ToString(), newTodo);
            todo.nextId++;
        }
    }
}
