class Todo: 
  def __init__(self, isCompleted: bool, todo: str):
    self.isCompleted = isCompleted
    self.todo = todo
  
  def toJson(self):
    return dict(isCompleted=self.isCompleted, todo=self.todo)

class Todos:
  def __init__(self, nextId: int, todoList: dict[str, Todo]):
    self.nextId = nextId
    self.todoList = todoList
  
  def toJson(self):
    return dict(nextId=self.nextId, todoList=self.todoList)