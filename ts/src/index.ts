import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  console.log("todo-ts v1.0.0");
  rl.question("Enter something: ", (input) => {
    console.log(`You entered: ${input}`);
    rl.close();
  });
}

main();
