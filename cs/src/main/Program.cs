using System;

class TodoCli
{
  static void Main(string[] args)
  {
    if (args.Length == 0)
    {
      Console.WriteLine("No command-line arguments provided.");
    }

    string op = args[0];
    System.Console.WriteLine(op);
  }

  public static void CreateTodo()
  {
    System.Console.WriteLine("Hello");
  }
}
