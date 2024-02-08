import { readFile, writeFile } from "fs/promises";
import { Operation, Todo, Todos } from "./types";

try {
  const [, , op, ...args] = process.argv;

  const json = await readFile("src/data.json", "utf-8");
  const todos = JSON.parse(json) as Todos;

  switch (op as Operation) {
    case "create":
      const [todo] = args;

      console.log(`created todo "${todo}" with id: ${todos.nextId}`);

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
      console.log("update");
      break;
    case "delete":
      console.log("delete");
      break;
    default:
      throw new Error(
        "usage: npm run start <create | edit | update | delete> arg1 arg2"
      );
  }

  const newJson = JSON.stringify(todos, null, 2);

  if (json !== newJson) await writeFile("src/data.json", newJson);
} catch (e) {
  console.error(
    e instanceof Error ? e.message : "An unknown error has occured."
  );
  process.exit(-1);
}
