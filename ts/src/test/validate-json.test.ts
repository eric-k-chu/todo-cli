import { Todos } from "../types";
import { validateTodo } from "../validate-todo";

describe("Todo Validation", () => {
  it("Passes", () => {
    expect(
      validateTodo({
        nextId: 5,
        todoList: {
          "1": {
            isCompleted: false,
            todo: "Bla",
          },
        },
      })
    ).toBe(true);
  });

  it("nextId is 0", () => {
    expect(
      validateTodo({
        nextId: 0,
        todoList: {},
      })
    ).toBe(true);
  });

  it("Empty todo", () => {
    expect(
      validateTodo({
        nextId: 5,
        todoList: {
          "1": {
            isCompleted: false,
            todo: "",
          },
        },
      })
    ).toBe(true);
  });

  it("empty todolist", () => {
    expect(
      validateTodo({
        nextId: 0,
        todoList: {},
      })
    ).toBe(true);
  });

  it("undefined values", () => {
    const todos = JSON.parse("{}") as Todos;
    expect(validateTodo(todos)).toBe(false);
  });
});
