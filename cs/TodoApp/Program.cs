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
                    Console.Error.WriteLine($"Unknown operation '{operation}'. Must be create, view, edit, delete, finish, or unfinish.");
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

        static void ViewTodo(Todos todo, string cmd)
        {
            if (todo.todoList.Count == 0)
            {
                Console.WriteLine("You have todos.");
                return;
            }

            if (cmd.Equals("all"))
            {
                foreach (KeyValuePair<string, Todo> item in todo.todoList)
                {
                    string status = item.Value.isCompleted ? "✓" : " ";
                    Console.WriteLine($"{item.Key}: [{status}] {item.Value.todo}");
                }
            }
            else
            {
                if (int.TryParse(cmd, out int key))
                {
                    if (!todo.todoList.ContainsKey(cmd))
                    {
                        Console.Error.WriteLine($"Todo with key '{cmd}' does not exist in your todos.");
                    }
                    else
                    {
                        Todo thisTodo = todo.todoList[cmd];
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
    }
}
