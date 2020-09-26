import { createCommand } from "commander-version";
import { exec } from "@bconnorwhite/exec";
import config from "../init/commitizen/config.json";
import { getScope, CommitArgs } from "./";

export async function commitStyle(args: CommitArgs) {
  return exec("git", [
    "commit", {
      m: `style${getScope(args.scope)}: ${args.message}`
    }
  ]);
}

export async function commitStyleAction(message: string, { scope }: { scope?: string }) {
  commitStyle({ message, scope });
}

export default createCommand("style")
  .description(config.types.style.description)
  .arguments("<message>")
  .option("-s --scope <scope>", "scope of changes")
  .action(commitStyleAction);
