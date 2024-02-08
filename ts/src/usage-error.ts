export class UsageError extends Error {
  constructor() {
    const usage = "usage: npm run start";
    const message = `${usage} create <todo>\n${usage} edit <id> <todo>\n${usage} view <id | all>\n${usage} finish <id>\n${usage} unfinish <id>\n${usage} update <id>\n${usage} delete <id>\n`;
    super(message);
  }
}
