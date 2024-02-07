import inquirer from "inquirer";
import { TodoAction, TodoActions } from "./types.js";
import { readTodos } from "./util/read-todos.js";

console.log("\nTODO-TS v1.0.0\n");

let action: TodoAction = "Create a todo";

try {
  do {
    const todos = await readTodos();

    if (todos.todos.length < 1) {
      console.log("\nYou have no todos.\n");
    } else {
      todos.todos.forEach((n) => console.log(n.action));
    }

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action",
        choices: TodoActions,
      },
    ]);
    if (answer.action !== "Exit")
      console.log(`\nYou chose: ${answer.action}\n`);
    action = answer.action;
  } while (action !== "Exit");
} catch (e) {
  console.error(
    e instanceof Error ? e.message : "An unknown error has occured"
  );
}
