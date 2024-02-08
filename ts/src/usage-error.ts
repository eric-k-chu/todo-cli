export class UsageError extends Error {
  constructor() {
    const str =
      "usage: npm run start create <todo>\nusage: npm run start edit <id> <todo>\nusage: npm run start update <id>\nusage: npm run start delete <id>";
    super(str);
  }
}
