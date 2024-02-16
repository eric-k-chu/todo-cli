class Todo: 
  def __init__(self, isCompleted: bool, todo: str):
    self.isCompleted = isCompleted
    self.todo = todo

class Todos:
  def __init__(self, nextId: int, todoList: dict[str, Todo]):
    self.nextId = nextId
    self.todoList = todoList