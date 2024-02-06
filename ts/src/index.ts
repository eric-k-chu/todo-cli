import { createInterface } from "readline";
import { Option } from "./types.js";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(input?: Option) {
  return `
    todo-ts v1.0.0
  
    You currently have no todo items.
  
    [${input === "1" || !input ? "x" : " "}] Create a new Note

    [${input === "0" ? "x" : " "}] Quit

  `;
}
async function main(option?: Option) {
  rl.question(prompt(option), (input) => {
    if (input === "0") {
      rl.close();
    } else {
      main();
    }
  });
}

main();
