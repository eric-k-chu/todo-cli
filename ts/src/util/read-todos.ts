import { readFile } from "node:fs/promises";
import { Todos } from "../types.js";

export async function readTodos(): Promise<Todos> {
  const jsonData = await readFile("src/data.json", "utf8");
  return JSON.parse(jsonData) as Todos;
}
