from todos import *

def createTodo(todos: Todos, argv: list[str]):
  if len(argv) < 3:
    print("Usage: python app.py arg1 arg2 arg3")
    return
  
  todoStr = argv[2]
  newTodo = Todo(isCompleted=False, todo=todoStr)
  todos.todoList[todos.nextId] = newTodo.toJson()
  todos.nextId += 1

def viewTodo(todos: Todos, argv: list[str]):
  if len(argv) < 3:
    print("Usage: python app.py arg1 arg2 arg3")
    return
  
  cmd = argv[2]
  if cmd == "all":
    for key, val in todos.todoList.items():
      status = "✓" if val["isCompleted"] else " "
      todo = val["todo"]
      print(f"{key}: [{status}] {todo}")
  else:
    if not cmd.isdigit():
      print(f"Specified key '{cmd}' is not a positive integer.")
      return
    
    if cmd not in todos.todoList:
      print(f"Todo with key '{cmd}' does not exist in your todos.")
      return
    
    todo = todos.todoList[cmd]
    status = "✓" if todo["isCompleted"] else " "
    todoStr = todo["todo"]
    print(f"{cmd}: [{status}] {todoStr}")
      
def editTodo(todos: Todos, argv: list[str]):
  if len(argv) < 4:
    print("Usage: python app.py arg1 arg2 arg3")
    return
  
  key = argv[2]
  todoStr = argv[3]
  
  if not key.isdigit():
    print(f"Specified key '{key}' is not a positive integer.")
    return
    
  if key not in todos.todoList:
    print(f"Todo with key '{key}' does not exist in your todos.")
    return
  
  todos.todoList[key]["todo"] = todoStr
  
def deleteTodo():
  print("Delete")
  
def updateTodo(isFinished: bool):
  print(isFinished)
