export type Operation =
  | "create"
  | "edit"
  | "view"
  | "finish"
  | "unfinish"
  | "delete";

export interface Todo {
  id: number;
  isCompleted: boolean;
  todo: string;
}

export interface Todos {
  nextId: number;
  todoList: Todo[];
}
