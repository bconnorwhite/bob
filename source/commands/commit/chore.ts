import { createCommand } from "commander-version";
import { exec } from "@bconnorwhite/exec";
import config from "../init/commitizen/config.json";
import { getScope, CommitArgs } from "./";

export async function commitChore(args: CommitArgs) {
  return exec("git", [
    "commit", {
      m: `chore${getScope(args.scope)}: ${args.message}`
    }
  ]);
}

export async function commitChoreAction(message: string, { scope }: { scope?: string }) {
  commitChore({ message, scope });
}

export default createCommand("chore")
  .description(config.types.chore.description)
  .arguments("<message>")
  .option("-s --scope <scope>", "scope of changes")
  .action(commitChoreAction);
