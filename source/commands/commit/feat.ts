import { createCommand } from "commander-version";
import { exec } from "@bconnorwhite/exec";
import config from "../init/commitizen/config.json";
import { getScope, CommitArgs } from "./";

export async function commitFeat(args: CommitArgs) {
  return exec("git", [
    "commit", {
      m: `feat${getScope(args.scope)}: ${args.message}`
    }
  ]);
}

export async function commitFeatAction(message: string, { scope }: { scope?: string }) {
  commitFeat({ message, scope });
}

export default createCommand("feat")
  .description(config.types.feat.description)
  .arguments("<message>")
  .option("-s --scope <scope>", "scope of changes")
  .action(commitFeatAction);
