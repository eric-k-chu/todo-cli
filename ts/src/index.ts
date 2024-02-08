import { readFile, writeFile } from "fs/promises";
import { createTodo, deleteTodo } from "./operations.js";
import { TodoError } from "./todo-error.js";
import { Operation, Todos } from "./types";
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
      console.log("edit");
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
  if (e instanceof TodoError) {
    console.error(`<${e.op}> ${e.message}`);
  } else {
    console.error(
      e instanceof Error ? e.message : "An unknown error has occured."
    );
  }
  process.exit(1);
}
