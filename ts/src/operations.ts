import { TodoError } from "./todo-error.js";
import { Operation, Todo, Todos } from "./types";

function getIndexById(todos: Todos, id: string, op: Operation): number {
  if (!Number.isInteger(+id))
    throw new TodoError("delete", "id must be a valid positive integer.");

  const index = todos.todoList.findIndex((n) => n.id === +id);

  if (index === -1) throw new TodoError(op, `cannot find todo with id: ${id}`);
  return index;
}

export function createTodo(todos: Todos, args: string[]): void {
  const [todo] = args;
  todos.todoList.push({
    id: todos.nextId,
    isCompleted: false,
    todo,
  } as Todo);
  console.log(`Created todo "${todo}" with id: ${todos.nextId++}.`);
}

export function editTodo(todos: Todos, args: string[]): void {
  const [id, todo] = args;
  const index = getIndexById(todos, id, "edit");
  todos.todoList[index] = { ...todos.todoList[index], todo };
  console.log(`Todo id: ${id} successfully edited.`);
}

export function viewTodo(todos: Todos, args: string[]): void {
  const [cmd] = args;

  if (cmd === "all") {
    todos.todoList.forEach((n) => {
      console.log(`${n.id}:  [${n.isCompleted ? "✓" : " "}] ${n.todo}`);
    });
  } else {
    const index = getIndexById(todos, cmd, "view");
    const todo = todos.todoList[index];
    console.log(`${todo.id}:  [${todo.isCompleted ? "✓" : " "}] ${todo.todo}`);
  }
}

export function deleteTodo(todos: Todos, args: string[]): void {
  const [id] = args;
  const index = getIndexById(todos, id, "delete");
  todos.todoList.splice(index, 1);
  console.log(`Todo id: ${id} successfully deleted.`);
}
