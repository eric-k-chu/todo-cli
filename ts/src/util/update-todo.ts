import { Todos } from "../types.js";
import { writeFile } from "node:fs/promises";

export async function updateTodo(todos: Todos): Promise<void> {
  const jsonData = JSON.stringify(todos, null, 2);
  await writeFile("src/data.json", jsonData);
}
