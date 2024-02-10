using System;
using Todo;

class TodoCli
{
    static void Main(string[] args)
    {
        if (args.Length <= 1)
        {
            Console.WriteLine("usage: dotnet run <arg1> <arg2> ...");
            return;
        }

        string op = args[0];
        Todos todo = new Todos();
        Console.WriteLine(todo.NextId);
    }
}
