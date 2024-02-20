import {
  createTodo,
  deleteTodo,
  editTodo,
  updateTodo,
  viewTodo,
} from "../operations.js";
import { Todos } from "../types.js";

describe("createTodo", () => {
  it("create todo", () => {
    const todo: Todos = {
      nextId: 0,
      todoList: {},
    };
    createTodo(todo, ["testing"]);
    expect(todo).toEqual({
      nextId: 1,
      todoList: {
        "0": {
          isCompleted: false,
          todo: "testing",
        },
      },
    });
  });
});

describe("editTodo", () => {
  it("edit todo", () => {
    const todo: Todos = {
      nextId: 1,
      todoList: {
        "0": {
          isCompleted: false,
          todo: "te",
        },
      },
    };
    editTodo(todo, ["0", "testing"]);
    expect(todo).toEqual({
      nextId: 1,
      todoList: {
        "0": {
          isCompleted: false,
          todo: "testing",
        },
      },
    });
  });
});

describe("viewTodo", () => {
  it("view one", () => {
    const todo: Todos = {
      nextId: 2,
      todoList: {
        "1": {
          isCompleted: false,
          todo: "testing",
        },
      },
    };
    expect(viewTodo(todo, ["1"])).toEqual([
      { isCompleted: false, todo: "testing" },
    ]);
  });

  it("view all", () => {
    const todo: Todos = {
      nextId: 3,
      todoList: {
        "1": {
          isCompleted: false,
          todo: "testing 1",
        },
        "2": {
          isCompleted: false,
          todo: "testing 2",
        },
      },
    };
    expect(viewTodo(todo, ["all"])).toEqual([
      { isCompleted: false, todo: "testing 1" },
      { isCompleted: false, todo: "testing 2" },
    ]);
  });
});

describe("finishTodo", () => {
  it("finish a todo", () => {
    const todo: Todos = {
      nextId: 1,
      todoList: {
        "0": {
          isCompleted: false,
          todo: "testing",
        },
      },
    };
    updateTodo(todo, ["0"], true);
    expect(todo).toEqual({
      nextId: 1,
      todoList: {
        "0": {
          isCompleted: true,
          todo: "testing",
        },
      },
    });
  });
});

describe("unfinishTodo", () => {
  it("unfinish a todo", () => {
    const todo: Todos = {
      nextId: 1,
      todoList: {
        "0": {
          isCompleted: true,
          todo: "testing",
        },
      },
    };
    updateTodo(todo, ["0"], false);
    expect(todo).toEqual({
      nextId: 1,
      todoList: {
        "0": {
          isCompleted: false,
          todo: "testing",
        },
      },
    });
  });
});

describe("deleteTodo", () => {
  it("deleting a todo", () => {
    const todo: Todos = {
      nextId: 1,
      todoList: {
        "0": {
          isCompleted: true,
          todo: "testing",
        },
      },
    };
    deleteTodo(todo, ["0"]);
    expect(todo).toEqual({
      nextId: 1,
      todoList: {},
    });
  });
});
