import { createCommand } from "commander-version";
import { exec } from "@bconnorwhite/exec";
import config from "../init/commitizen/config.json";
import { getScope, CommitArgs } from "./";

export async function commitCI(args: CommitArgs) {
  return exec("git", [
    "commit", {
      m: `ci${getScope(args.scope)}: ${args.message}`
    }
  ]);
}

export async function commitCIAction(message: string, { scope }: { scope?: string }) {
  commitCI({ message, scope });
}

export default createCommand("ci")
  .description(config.types.ci.description)
  .arguments("<message>")
  .option("-s --scope <scope>", "scope of changes")
  .action(commitCIAction);
