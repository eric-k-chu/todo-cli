import { readFile, writeFile } from "fs/promises";
import { Operation, Todo, Todos } from "./types";
import { UsageError } from "./usage-error.js";
import { TodoError } from "./todo-error.js";

try {
  const [, , op, ...args] = process.argv;

  const json = await readFile("src/data.json", "utf-8");
  const todos = JSON.parse(json) as Todos;

  switch (op as Operation) {
    case "create":
      const [todo] = args;

      console.log(`Created todo "${todo}" with id: ${todos.nextId}.`);

      todos.todoList.push({
        id: todos.nextId++,
        isCompleted: false,
        todo,
      } as Todo);
      break;
    case "edit":
      console.log("edit");
      break;
    case "finish":
      break;
    case "unfinish":
      break;
    case "delete":
      const [id] = args;

      if (!Number.isInteger(id))
        throw new TodoError("delete", "id must be a valid positive integer.");

      const index = todos.todoList.findIndex((n) => n.id === Number(id));
      todos.todoList.splice(index, 1);

      console.log(`Todo id: ${id} successfully deleted.`);

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
