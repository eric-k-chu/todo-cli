export const TodoActions = [
  "Create a todo",
  "Edit a todo",
  "Update a todo",
  "Delete a todo",
  "Exit",
] as const;

export type TodoAction = (typeof TodoActions)[number];

interface Todo {
  isCompleted: boolean;
  action: string;
}

export interface Todos {
  todoList: Todo[];
}
