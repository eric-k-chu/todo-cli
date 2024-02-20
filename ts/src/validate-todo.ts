import { Todos } from "./types";

export function validateTodo(todos: Todos): boolean {
  if (todos.nextId === undefined) return false;

  const todoList = todos.todoList;
  if (todoList) {
    for (const key in todoList) {
      const { todo, isCompleted } = todoList[key];
      if (todo === undefined || isCompleted === undefined) {
        return false;
      }
    }
  }

  return true;
}
