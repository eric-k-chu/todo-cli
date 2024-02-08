import { readFile, writeFile } from "fs/promises";
import { logError } from "./log-error.js";
import { UsageError } from "./usage-error.js";
import { createTodo, deleteTodo, editTodo } from "./operations.js";
import { Operation, Todos } from "./types.js";

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
    case "finish":
      break;
    case "unfinish":
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
