import { createCommand } from "commander-version";
import { exec } from "@bconnorwhite/exec";
import config from "../init/commitizen/config.json";
import { getScope, CommitArgs } from "./";

export async function commitTest(args: CommitArgs) {
  return exec("git", [
    "commit", {
      m: `test${getScope(args.scope)}: ${args.message}`
    }
  ]);
}

export async function commitTestAction(message: string, { scope }: { scope?: string }) {
  commitTest({ message, scope });
}

export default createCommand("test")
  .description(config.types.test.description)
  .arguments("<message>")
  .option("-s --scope <scope>", "scope of changes")
  .action(commitTestAction);
