import { readFile, writeFile } from "fs/promises";
import { Operation, Todo, Todos } from "./types";
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
    case "update":
      break;
    case "delete":
      const [id] = args;

      const index = todos.todoList.findIndex((n) => n.id === Number(id));
      todos.todoList.splice(index, 1);

      console.log(`Todo id: ${id} successfully deleted.`);

      break;
    default:
      throw new TodoError(
        "usage: npm run start create <todo>",
        "usage: npm run start edit <id> <todo>",
        "usage: npm run start update <id>",
        "usage: npm run start delete <id>`"
      );
  }

  const newJson = JSON.stringify(todos, null, 2);

  if (json !== newJson) await writeFile("src/data.json", newJson);
} catch (e) {
  console.error(
    e instanceof Error ? e.message : "An unknown error has occured."
  );
  process.exit(1);
}
