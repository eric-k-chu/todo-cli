import { viewTodo } from "../operations.js";
import { Todo, Todos } from "../types.js";

describe("viewTodo", () => {
  it("view one", () => {
    const todo: Todos = {
      nextId: 1,
      todoList: {
        "1": {
          isCompleted: false,
          todo: "testing",
        },
      },
    };
    expect(viewTodo(todo, ["1"])).toEqual([
      { isCompleted: false, todo: "testing" },
    ] as Todo[]);
  });
});
