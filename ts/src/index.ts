import inquirer from "inquirer";
import { TodoAction, TodoActions } from "./types.js";
import { readTodos } from "./util/read-todos.js";
import { displayTodos } from "./util/cli-interface.js";

console.log("\nTODO-TS v1.0.0\n");

let action: TodoAction = "Create a todo";

try {
  do {
    const todos = await readTodos();

    displayTodos(todos);

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action",
        choices: TodoActions,
      },
    ]);

    action = answer.action;

    switch (action) {
      case "Create a todo":
        console.log("\nWIP\n");
        break;
      case "Edit a todo":
        console.log("\nWIP\n");
        break;
      case "Update a todo":
        console.log("\nShow prompt\n");
        break;
      case "Delete a todo":
        console.log("\nWIP\n");
        break;
      case "Exit":
        console.log("\nExiting...");
        break;
    }
  } while (action !== "Exit");
} catch (e) {
  console.error(
    e instanceof Error ? e.message : "An unknown error has occured"
  );
}
