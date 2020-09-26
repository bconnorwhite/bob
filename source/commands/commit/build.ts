import { createCommand } from "commander-version";
import { exec } from "@bconnorwhite/exec";
import config from "../init/commitizen/config.json";
import { getScope, CommitArgs } from "./";

export async function commitBuild(args: CommitArgs) {
  return exec("git", [
    "commit", {
      m: `build${getScope(args.scope)}: ${args.message}`
    }
  ]);
}

export async function commitBuildAction(message: string, { scope }: { scope?: string }) {
  commitBuild({ message, scope });
}

export default createCommand("build")
  .description(config.types.build.description)
  .arguments("<message>")
  .option("-s --scope <scope>", "scope of changes")
  .action(commitBuildAction);
