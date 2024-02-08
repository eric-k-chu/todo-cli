export type Operation =
  | "create"
  | "edit"
  | "view"
  | "finish"
  | "unfinish"
  | "delete";

export interface Todo {
  isCompleted: boolean;
  todo: string;
}

export interface Todos {
  nextId: number;
  todoList: {
    [key: string]: Todo;
  };
}
