import sys
import json
from operations import *
from todos import Todos

if len(sys.argv) < 3:
  print("Usage: python app.py arg1 arg2")
  sys.exit(1)
  
file = open("data.json")

j = json.load(file)
todos = Todos(**j)

name = sys.argv[0]

op = sys.argv[1]

match op:
  case "create":
    createTodo(todos, sys.argv[2])
  case "view":
    viewTodo(todos, sys.argv[2])
  case "edit":
    editTodo()
  case "delete":
    deleteTodo()
  case "finish":
    updateTodo(True)
  case "unfinish":
    updateTodo(False)
  case _:
    print(f"Invalid operation '{op}'. Must be create, view, edit, delete, finish, or unfinish.")
    
with open("data.json", "w") as f:
  json.dump(todos.toJson(), f)