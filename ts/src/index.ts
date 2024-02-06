import inquirer from "inquirer";
import { TodoAction, TodoActions } from "./types.js";

console.log("TODO-TS v1.0.0");

let action: TodoAction = "Create a todo";

do {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Choose an action",
      choices: TodoActions,
    },
  ]);
  if (answer.action !== "Exit") console.log(`\nYou chose: ${answer.action}\n`);
  action = answer.action;
} while (action !== "Exit");
