using System;

class TodoCli
{
  static void Main(string[] args)
  {
    foreach (string arg in args)
    {
      System.Console.WriteLine(arg);
    }

    CreateTodo();
  }

  public static void CreateTodo()
  {
    System.Console.WriteLine("Hello");
  }
}
