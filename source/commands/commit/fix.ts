import { createCommand } from "commander-version";
import { exec } from "@bconnorwhite/exec";
import config from "../init/commitizen/config.json";
import { getScope, CommitArgs } from "./";

export async function commitFix(args: CommitArgs) {
  return exec("git", [
    "commit", {
      m: `fix${getScope(args.scope)}: ${args.message}`
    }
  ]);
}

export async function commitFixAction(message: string, { scope }: { scope?: string }) {
  commitFix({ message, scope });
}

export default createCommand("fix")
  .description(config.types.fix.description)
  .arguments("<message>")
  .option("-s --scope <scope>", "scope of changes")
  .action(commitFixAction);
