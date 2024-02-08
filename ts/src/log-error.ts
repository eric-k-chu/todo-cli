import { TodoError } from "./todo-error.js";

export function logError(e: unknown): void {
  if (e instanceof TodoError) {
    console.error(`<${e.op}> ${e.message}`);
  } else {
    console.error(
      e instanceof Error ? e.message : "An unknown error has occured."
    );
  }
}
