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
    createTodo(todos=todos, argv=sys.argv)
  case "view":
    viewTodo(todos=todos, argv=sys.argv)
  case "edit":
    editTodo(todos=todos, argv=sys.argv)
  case "delete":
    deleteTodo(todos=todos, argv=sys.argv)
  case "finish":
    updateTodo(todos=todos, argv=sys.argv, isFinished=True)
  case "unfinish":
    updateTodo(todos=todos, argv=sys.argv, isFinished=False)
  case _:
    print(f"Invalid operation '{op}'. Must be create, view, edit, delete, finish, or unfinish.")
    
with open("data.json", "w") as f:
  json.dump(todos.toJson(), f)