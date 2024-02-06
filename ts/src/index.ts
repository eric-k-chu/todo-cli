import inquirer from "inquirer";
import { TodoAction, TodoActions } from "./types.js";

console.log("TODO-TS v1.0.0");

let option: TodoAction = "Create a todo";

do {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "Choose an action",
      choices: TodoActions,
    },
  ]);
  if (answer.option !== "Exit") console.log(`\nYou chose: ${answer.option}\n`);
  option = answer.option;
} while (option !== "Exit");
