import { writeFile } from "node:fs/promises";

async function write() {
  await writeFile("text.txt", "Testing");
}

console.log("hello world");

write();
