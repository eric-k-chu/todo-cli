using System;

class TodoCli
{
  static void Main(string[] args)
  {
    foreach (string arg in args)
    {
      Console.WriteLine(arg);
    }
  }
}
