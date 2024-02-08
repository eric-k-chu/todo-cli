export type Operation = "create" | "edit" | "update" | "delete";

export interface Todo {
  id: number;
  isCompleted: boolean;
  todo: string;
}

export interface Todos {
  nextId: number;
  todoList: Todo[];
}
