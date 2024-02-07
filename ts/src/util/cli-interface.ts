import { Todos } from "../types.js";

export function displayTodos(todos: Todos): void {
  const todo = todos.todoList;

  if (todo.length < 1) {
    console.log("You currently have no todos.\n");
  } else {
    todo.forEach((n, i) =>
      console.log(
        `[${n.isCompleted ? "✓" : " "}] ${
          i === todo.length - 1 ? n.action + "\n" : n.action
        }`
      )
    );
  }
}
