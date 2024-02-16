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
                Console.Error.WriteLine("Usage: <operation> <cmd>");
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
                    ViewTodo(todos, args[1]);
                    break;
                case "edit":
                    EditTodo(ref todos, args[1], args[2]);
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
                    Console.Error.WriteLine($"Unknown operation '{operation}'. Must be create, view, edit, delete, finish, or unfinish.");
                    break;
            }

            // Write to file
            jsonTodos = JsonSerializer.Serialize(todos, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(dataFile, jsonTodos);
        }

        static void CreateTodo(ref Todos todos, string todoStr)
        {
            Todo newTodo = new Todo
            {
                isCompleted = false,
                todo = todoStr,
            };
            todos.todoList.Add(todos.nextId.ToString(), newTodo);
            todos.nextId++;
        }

        static void ViewTodo(Todos todos, string cmd)
        {
            if (todos.todoList.Count == 0)
            {
                Console.WriteLine("You have todos.");
                return;
            }

            if (cmd.Equals("all"))
            {
                foreach (KeyValuePair<string, Todo> item in todos.todoList)
                {
                    string status = item.Value.isCompleted ? "✓" : " ";
                    Console.WriteLine($"{item.Key}: [{status}] {item.Value.todo}");
                }
            }
            else
            {
                if (int.TryParse(cmd, out int key))
                {
                    if (!todos.todoList.ContainsKey(cmd))
                    {
                        Console.Error.WriteLine($"Todo with key '{cmd}' does not exist in your todos.");
                    }
                    else
                    {
                        Todo thisTodo = todos.todoList[cmd];
                        string status = thisTodo.isCompleted ? "✓" : " ";
                        Console.WriteLine($"{cmd}: [{status}] {thisTodo.todo}");
                    }
                }
                else
                {
                    Console.Error.WriteLine($"Specified key '{cmd}' must be a valid positive integer.");
                }
            }
        }

        static void EditTodo(ref Todos todos, string key, string todoStr)
        {
            if (int.TryParse(key, out int id))
            {
                if (!todos.todoList.ContainsKey(key))
                {
                    Console.Error.WriteLine($"Todo with key '{key}' does not exist in your todos.");
                }
                else
                {
                    todos.todoList[key].todo = todoStr;
                }
            }
        }
    }
}
