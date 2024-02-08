import { Operation } from "./types";

try {
  const [, , op, ...args] = process.argv;

  switch (op as Operation) {
    case "create":
      console.log("create");
      break;
    case "edit":
      console.log("edit");
      break;
    case "update":
      console.log("update");
      break;
    case "delete":
      console.log("delete");
      break;
    default:
      throw new Error(
        "usage: npm run start <create | edit | update | delete> arg1 arg2"
      );
  }
} catch (e) {
  console.error(
    e instanceof Error ? e.message : "An unknown error has occured."
  );
  process.exit(-1);
}
