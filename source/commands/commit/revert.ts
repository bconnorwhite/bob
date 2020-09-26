import { createCommand } from "commander-version";
import { exec } from "@bconnorwhite/exec";
import config from "../init/commitizen/config.json";
import { getScope, CommitArgs } from "./";

export async function commitRevert(args: CommitArgs) {
  return exec("git", [
    "commit", {
      m: `revert${getScope(args.scope)}: ${args.message}`
    }
  ]);
}

export async function commitRevertAction(message: string, { scope }: { scope?: string }) {
  commitRevert({ message, scope });
}

export default createCommand("revert")
  .description(config.types.revert.description)
  .arguments("<message>")
  .option("-s --scope <scope>", "scope of changes")
  .action(commitRevertAction);
