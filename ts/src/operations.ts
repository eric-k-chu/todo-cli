import { TodoError } from "./todo-error.js";
import { Todo, Todos } from "./types";

export function createTodo(todos: Todos, args: string[]): void {
  const [todo] = args;

  console.log(`Created todo "${todo}" with id: ${todos.nextId}.`);

  todos.todoList.push({
    id: todos.nextId++,
    isCompleted: false,
    todo,
  } as Todo);
}

export function deleteTodo(todos: Todos, args: string[]): void {
  const [id] = args;

  if (!Number.isInteger(+id))
    throw new TodoError("delete", "id must be a valid positive integer.");

  const index = todos.todoList.findIndex((n) => n.id === Number(id));
  todos.todoList.splice(index, 1);

  console.log(`Todo id: ${id} successfully deleted.`);
}
