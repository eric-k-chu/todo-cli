from todos import *

def createTodo():
  print("Create")

def viewTodo(todos: Todos, cmd: str):
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
    
  
def editTodo():
  print("Edit")
  
def deleteTodo():
  print("Delete")
  
def updateTodo(isFinished: bool):
  print(isFinished)
