import { Operation } from "./types";

export class TodoError extends Error {
  constructor(public op: Operation, public message: string) {
    super(message);
  }
}
