import { TodoError } from "./todo-error.js";
import { Operation, Todo, Todos } from "./types";

function validateId(todos: Todos, id: string, op: Operation): number {
  if (!Number.isInteger(+id))
    throw new TodoError("delete", "id must be a valid positive integer.");

  if (!todos.todoList[+id])
    throw new TodoError(op, `cannot find todo with id: ${id}`);

  return +id;
}

export function createTodo(todos: Todos, args: string[]): void {
  const [todo] = args;
  const newId = todos.nextId;
  todos.todoList[newId] = { isCompleted: false, todo };
  console.log(`Created todo "${todo}" with id: ${todos.nextId++}.`);
}

export function editTodo(todos: Todos, args: string[]): void {
  const [id, todo] = args;
  const todoId = validateId(todos, id, "edit");
  todos.todoList[todoId] = {
    ...todos.todoList[todoId],
    todo,
  };
  console.log(`Todo id: ${id} successfully edited.`);
}

export function viewTodo(todos: Todos, args: string[]): Todo[] {
  const [cmd] = args;

  if (cmd === "all") {
    const todoList: Todo[] = [];
    for (const key in todos.todoList) {
      const todo = todos.todoList[key];
      console.log(`${key}:  [${todo.isCompleted ? "✓" : " "}] ${todo.todo}`);
      todoList.push({ isCompleted: todo.isCompleted, todo: todo.todo });
    }
    return todoList;
  } else {
    const todoId = validateId(todos, cmd, "view");
    const todo = todos.todoList[todoId];
    console.log(`${todoId}:  [${todo.isCompleted ? "✓" : " "}] ${todo.todo}`);
    return [{ isCompleted: todo.isCompleted, todo: todo.todo }];
  }
}

export function finishTodo(todos: Todos, args: string[]): void {
  const [id] = args;
  const todoId = validateId(todos, id, "finish");
  todos.todoList[todoId] = {
    ...todos.todoList[todoId],
    isCompleted: true,
  };

  console.log(`Todo "${todos.todoList[todoId].todo}" finished.`);
}

export function unfinishTodo(todos: Todos, args: string[]): void {
  const [id] = args;
  const todoId = validateId(todos, id, "unfinish");
  todos.todoList[todoId] = {
    ...todos.todoList[todoId],
    isCompleted: false,
  };

  console.log(`Todo "${todos.todoList[todoId].todo}" unfinished.`);
}

export function deleteTodo(todos: Todos, args: string[]): void {
  const [id] = args;
  const todoId = validateId(todos, id, "delete");
  const deletedTodo = todos.todoList[todoId];
  delete todos.todoList[todoId];
  console.log(`Todo id: ${id} successfully deleted.`);
}
