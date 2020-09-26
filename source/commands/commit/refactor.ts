import { createCommand } from "commander-version";
import { exec } from "@bconnorwhite/exec";
import config from "../init/commitizen/config.json";
import { getScope, CommitArgs } from "./";

export async function commitRefactor(args: CommitArgs) {
  return exec("git", [
    "commit", {
      m: `refactor${getScope(args.scope)}: ${args.message}`
    }
  ]);
}

export async function commitRefactorAction(message: string, { scope }: { scope?: string }) {
  commitRefactor({ message, scope });
}

export default createCommand("refactor")
  .description(config.types.refactor.description)
  .arguments("<message>")
  .option("-s --scope <scope>", "scope of changes")
  .action(commitRefactorAction);
