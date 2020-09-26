import { createCommand } from "commander-version";
import { exec } from "@bconnorwhite/exec";
import config from "../init/commitizen/config.json";
import { getScope, CommitArgs } from "./";

export async function commitPerf(args: CommitArgs) {
  return exec("git", [
    "commit", {
      m: `perf${getScope(args.scope)}: ${args.message}`
    }
  ]);
}

export async function commitPerfAction(message: string, { scope }: { scope?: string }) {
  commitPerf({ message, scope });
}

export default createCommand("perf")
  .description(config.types.perf.description)
  .arguments("<message>")
  .option("-s --scope <scope>", "scope of changes")
  .action(commitPerfAction);
