import { readFile, writeFile } from "fs/promises";
import { logError } from "./log-error.js";
import {
  createTodo,
  deleteTodo,
  editTodo,
  updateTodo,
  viewTodo,
} from "./operations.js";
import { Operation, Todos } from "./types.js";
import { UsageError } from "./usage-error.js";

try {
  const [, , op, ...args] = process.argv;

  const json = await readFile("src/data.json", "utf-8");
  const todos = JSON.parse(json) as Todos;

  switch (op as Operation) {
    case "create":
      createTodo(todos, args);
      break;
    case "edit":
      editTodo(todos, args);
      break;
    case "view":
      viewTodo(todos, args);
      break;
    case "finish":
      updateTodo(todos, args, true);
      break;
    case "unfinish":
      updateTodo(todos, args, false);
      break;
    case "delete":
      deleteTodo(todos, args);
      break;
    default:
      throw new UsageError();
  }

  const newJson = JSON.stringify(todos, null, 2);

  if (json !== newJson) await writeFile("src/data.json", newJson);
} catch (e) {
  logError(e);
  process.exit(1);
}
